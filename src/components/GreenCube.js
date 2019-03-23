import React from "react";
import * as THREE from "three";

import { ResizeSensor } from "../helpers";


class GreenCube extends React.Component {
  /**
   * Constructor
   */
  constructor(props) {
    super(props);
    this.updateDimensions = this.updateDimensions.bind(this);
    this.myRef = React.createRef();

    // this.state = {
    //   width: window.innerWidth,
    //   height: window.innerHeight
    // };
  }

  /**
   * Rendering
   */
  render() {
    return (
      <div
        style={{ width: "100%", height: "100%" }}
        ref={(r) => this.myRef = r}
      />
    );
  }

  /**
   * Initialization
   */
  componentDidMount() {
    window.addEventListener("resize", this.updateDimensions.bind(this));
    // this.myRef.addEventListener("resize", this.updateDimensions);
    // console.log(typeof this.myRef, { t: this.myRef });
    this.width = this.myRef.clientWidth;
    this.height = this.myRef.clientHeight;

    // this.myRef.onresize = myFunction;
    new ResizeSensor(this.myRef, this.updateDimensions);
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(75, this.width / this.height, 0.1, 1000);

    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setSize(this.width, this.height);
    this.myRef.appendChild(this.renderer.domElement);

    this.directionalLight = new THREE.DirectionalLight(0x9090aa);
    this.directionalLight.position.set(-10, 10, -10).normalize();
    this.scene.add(this.directionalLight);

    this.hemisphereLight = new THREE.HemisphereLight(0xffffff, 0x444444);
    this.hemisphereLight.position.set(1, 1, 1);
    this.scene.add(this.hemisphereLight);

    this.geometry = new THREE.BoxGeometry(2, 3, 1);
    this.material = new THREE.MeshStandardMaterial({ color: 0x00ff00, metalness: 0.15 });
    this.cube = new THREE.Mesh(this.geometry, this.material);
    this.scene.add(this.cube);

    this.camera.position.z = 5;
    this.updateDimensions();
    this.animate(); 
  }

  /**
   * Animation loop
   */
  animate() {
    requestAnimationFrame(this.animate.bind(this));

    this.cube.rotation.x += 0.01;
    this.cube.rotation.y += 0.01;

    this.renderer.render(this.scene, this.camera);
  }

  /**
   * Resize operation handler, updating dimensions.
   * Setting state will invalidate the component
   * and call `componentWillUpdate()`.
   */
  updateDimensions(e) {
    console.log({ e, t: this.myRef });

    // this.setState({
    //   width: this.myRef.clientWidth,
    //   height: this.myRef.clientHeight
    // });
    if (this.myRef !== null) {
      this.width = this.myRef.clientWidth;
      this.height = this.myRef.clientHeight;
    }

    console.log({
      width: this.width,
      height: this.height
    });

    if (this.renderer !== undefined) {
      this.renderer.setSize(this.width, this.height);
      this.camera.aspect = this.width / this.height;
      this.camera.updateProjectionMatrix();
    }
  }

  /**
   * Invalidation handler, updating layout
   */
  componentWillUpdate() {
    const width = this.myRef.clientWidth;
    const height = this.myRef.clientHeight;

    // const {width, height } = this.state;
    this.renderer.setSize(width, height);
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
  }

  /**
   * Dipose
   */
  componentWillUnmount() {
    window.removeEventListener("resize", this.updateDimensions);
  }
}

export default GreenCube;
