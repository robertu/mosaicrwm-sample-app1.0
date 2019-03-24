import React from "react";
import * as THREE from "three";

class GreenCube extends React.Component {

  /**
   * Rendering
   */
  render() {
    return (
      <div
        style={{ width: "100%", height: "100%" }}
        ref={r => (this.canvas = r)}
      />
    );
  }

  /**
   * Initialization
   */
  componentDidMount() {
    this.width = this.canvas.clientWidth;
    this.height = this.canvas.clientHeight;

    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(
      75,
      this.width / this.height,
      0.1,
      1000
    );

    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setSize(this.width, this.height);
    this.canvas.appendChild(this.renderer.domElement);

    this.directionalLight = new THREE.DirectionalLight(0x9090aa);
    this.directionalLight.position.set(-10, 10, -10).normalize();
    this.scene.add(this.directionalLight);

    this.hemisphereLight = new THREE.HemisphereLight(0xffffff, 0x444444);
    this.hemisphereLight.position.set(1, 1, 1);
    this.scene.add(this.hemisphereLight);

    this.geometry = new THREE.BoxGeometry(2, 3, 1);
    this.material = new THREE.MeshStandardMaterial({
      color: 0x00ff00,
      metalness: 0.15
    });
    this.cube = new THREE.Mesh(this.geometry, this.material);
    this.scene.add(this.cube);

    this.camera.position.z = 5;
    this.componentDidUpdate();
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
   */
  componentDidUpdate() {
    this.width = this.canvas.clientWidth;
    this.height = this.canvas.clientHeight;
    this.renderer.setSize(this.width, this.height);
    this.camera.aspect = this.width / this.height;
    this.camera.updateProjectionMatrix();
  }
}

export default GreenCube;
