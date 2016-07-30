import React from 'react';

import getWebcamVideo from '../util/mediaSource';

const CANVAS_COUNT = 9;
const VIDEO_WIDTH_BIG = 480;
const VIDEO_HEIGHT_BIG = 360;
const VIDEO_WIDTH_SMALL = 144;
const VIDEO_HEIGHT_SMALL = 104;

class InlineRecorder extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      video: null,
      canvases: [],
      textures: [],
      selectedEffect: null,
    };

    this.redrawFilters = this.redrawFilters.bind(this);
    this.changeSelectedEffect = this.changeSelectedEffect.bind(this);
  }

  componentDidMount() {
    this.initFilters();
  }

  initFilters() {
    getWebcamVideo()
      .then((video) => {
        const canvases = _.range(0, CANVAS_COUNT).map((i) => fx.canvas());
        const textures = canvases.map((canvas) => canvas.texture(video));

        canvases.forEach((canvas, i) => {
          const rows = Math.sqrt(canvases.length);
          const row = Math.floor(i / rows);
          document.getElementById(`grid-row-${row}`).appendChild(canvas);

          canvas.id = `filter-${i}`;
          canvas.dataset.index = i;
          canvas.addEventListener('click', this.changeSelectedEffect);
        });

        this.setState({
          video,
          canvases,
          textures,
        });

        this.positionVideos();
        requestAnimationFrame(this.redrawFilters);
      });
  }

  changeSelectedEffect(e) {
    // If the clicked effect was already selected, deselect it by setting selectedEffect to null
    const selectedEffect = this.state.selectedEffect === e.target.dataset.index ? null : e.target.dataset.index;
    this.setState({
      selectedEffect,
    });
    this.positionVideos();
  }

  positionVideos() {
    if (this.state.selectedEffect !== null) {
      const canvas = this.state.canvases[this.state.selectedEffect];
      canvas.style.left = '0px';
      canvas.style.top = '0px';
      canvas.style.width = `${VIDEO_WIDTH_BIG}px`;
      canvas.style.height = `${VIDEO_HEIGHT_BIG}px`;
      canvas.style['z-index'] = 1;
    } else {
      this.state.canvases.forEach((canvas, i) => {
        const rows = Math.sqrt(this.state.canvases.length);
        const row = i % rows;
        const col = Math.floor(i / rows);
        const left = 12 + row * (12 + 144);
        const top = 12 + col * (12 + 104);
        canvas.style.left = `${left}px`;
        canvas.style.top = `${top}px`;
        canvas.style.width = `${VIDEO_WIDTH_SMALL}px`;
        canvas.style.height = `${VIDEO_HEIGHT_SMALL}px`;
        canvas.style['z-index'] = 0;
      });
    }
  }

  redrawFilters() {
    this.state.canvases.forEach((canvas, i) => {
      const texture = this.state.textures[i];
      texture.loadContentsOf(this.state.video);
      if (i === 0) canvas.draw(texture).bulgePinch(canvas.width / 2, canvas.height / 2, 200, 0.80).update();
      if (i === 1) canvas.draw(texture).swirl(canvas.width / 2, canvas.height / 2, 150, 3).update();
      if (i === 2) canvas.draw(texture).bulgePinch(canvas.width / 2, canvas.height / 2, 100, 0.80).update();
      if (i === 3) canvas.draw(texture).ink(0.35).update();
      if (i === 4) canvas.draw(texture).update();
      if (i === 5) canvas.draw(texture).unsharpMask(20, 2).update();
      if (i === 6) canvas.draw(texture).sepia(1).update();
      if (i === 7) canvas.draw(texture).edgeWork(5).update();
      if (i === 8) canvas.draw(texture).hueSaturation(-1, 0).update();
    });

    requestAnimationFrame(this.redrawFilters);
  }

  render() {
    return (
      <li className="recorder">
        <div id="grid-row-0"></div>
        <div id="grid-row-1"></div>
        <div id="grid-row-2"></div>
      </li>
    );
  }
}

InlineRecorder.propTypes = {
  currentUser: React.PropTypes.string,
  messages: React.PropTypes.array,
};

export default InlineRecorder;
