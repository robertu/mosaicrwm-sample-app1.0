import React from "react";
import * as THREE from "three";

import { TrackballControls, DragControls } from "threejs-ext";

class DraggableCubes extends React.Component {

  /**
   * Rendering
   */
  render() {
    return (
      <div
        style={{ width: "100%", height: "100%" }}
        ref={c => (this.canvas = c)}
      />
    );
  }

  /**
   * Initialization
   */
  componentDidMount() {
    const { rotation, rescale, count } = this.props;
    this.objects = [];

    this.width = this.canvas.clientWidth;
    this.height = this.canvas.clientHeight;

    this.container = document.createElement("div");
    this.canvas.appendChild(this.container);
    this.camera = new THREE.PerspectiveCamera(
      70,
      this.width / this.height,
      1,
      5000
    );
    this.camera.position.z = 1000;
    this.controls = new TrackballControls(this.camera);
    this.controls.rotateSpeed = 1.0;
    this.controls.zoomSpeed = 1.2;
    this.controls.panSpeed = 0.8;
    this.controls.noZoom = false;
    this.controls.noPan = false;
    this.controls.staticMoving = true;
    this.controls.dynamicDampingFactor = 0.3;
    this.container.addEventListener(
      "mouseenter",
      () => (this.controls.enabled = true)
    );
    this.container.addEventListener(
      "mouseout",
      () => (this.controls.enabled = false)
    );
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0xf0f0f0);
    this.scene.add(new THREE.AmbientLight(0x505050));
    this.light = new THREE.SpotLight(0xffffff, 1.5);
    this.light.position.set(0, 500, 2000);
    this.light.angle = Math.PI / 9;
    this.light.castShadow = true;
    this.light.shadow.camera.near = 1000;
    this.light.shadow.camera.far = 4000;
    this.light.shadow.mapSize.width = 1024;
    this.light.shadow.mapSize.height = 1024;
    this.scene.add(this.light);
    this.geometry = new THREE.BoxBufferGeometry(40, 40, 40);
    for (let i = 0; i < count; i += 1) {
      const object = new THREE.Mesh(
        this.geometry,
        new THREE.MeshLambertMaterial({ color: Math.random() * 0xffffff })
      );
      object.position.x = Math.random() * 1000 - 500;
      object.position.y = Math.random() * 600 - 300;
      object.position.z = Math.random() * 800 - 400;
      object.rotation.x = Math.random() * rotation * Math.PI;
      object.rotation.y = Math.random() * rotation * Math.PI;
      object.rotation.z = Math.random() * rotation * Math.PI;
      object.scale.x = Math.random() * rescale + 1;
      object.scale.y = Math.random() * rescale + 1;
      object.scale.z = Math.random() * rescale + 1;
      object.castShadow = true;
      object.receiveShadow = true;
      this.scene.add(object);
      this.objects.push(object);
    }
    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setSize(this.width, this.height);
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFShadowMap;
    this.container.appendChild(this.renderer.domElement);
    this.dragControls = new DragControls(
      this.objects,
      this.camera,
      this.renderer.domElement
    );
    this.dragControls.addEventListener(
      "dragstart",
      () => (this.controls.enabled = false)
    );
    this.dragControls.addEventListener(
      "dragend",
      () => (this.controls.enabled = true)
    );
    this.animate();
  }

  animate() {
    requestAnimationFrame(this.animate.bind(this));
    this.controls.update();
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

DraggableCubes.defaultProps = {
  rotation: 0,
  rescale: 0,
  count: 100
};
export default DraggableCubes;
