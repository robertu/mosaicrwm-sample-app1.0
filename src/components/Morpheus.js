import React from "react";
import * as THREE from "three";

import { OrbitControls } from "threejs-ext";
import { ResizeSensor } from "../helpers";
import { Label, Slider } from "@blueprintjs/core";

class Morpheus extends React.Component {
  /**
   * Constructor
   */
  constructor(props) {
    super(props);
    this.updateDimensions = this.updateDimensions.bind(this);
    this.myRef = React.createRef();
    this.state = {
      twist: 0,
      spherify: 0
    };
  }

  /**
   * Rendering
   */
  render() {
    return (
      <div style={{ width: "100%", height: "100%" }}>
        <div className="sliderro" style={{ width: 50, height: 400, position: "absolute", top: 20, right: 20 }}>
          <Label>
            Spherify
            <Slider
              min={0.0}
              max={1.0}
              stepSize={0.01}
              labelStepSize={0.2}
              onChange={(value) => this.setSpherify(value)}
              labelRenderer={(val) => `${Math.round(val * 100)}%`}
              value={this.state.spherify}
              vertical={true}
            />
          </Label>
        </div>
        <div className="sliderro" style={{ width: 50, height: 400, position: "absolute", top: 20, right: 90 }}>
          <Label>
            Twist
            <Slider
              min={0.0}
              max={1.0}
              stepSize={0.01}
              labelStepSize={0.2}
              onChange={(value) => this.setTwist(value)}
              labelRenderer={(val) => `${Math.round(val * 100)}%`}
              value={this.state.twist}
              vertical={true}
            />
          </Label>
        </div>
        <div style={{ width: "100%", height: "100%" }} ref={(r) => (this.myRef = r)} />
      </div>
    );
  }

  /**
   * Initialization
   */
  componentDidMount() {
    // const { rotation, rescale, count } = this.props;
    this.objects = [];

    window.addEventListener("resize", this.updateDimensions);

    this.width = this.myRef.clientWidth;
    this.height = this.myRef.clientHeight;

    new ResizeSensor(this.myRef, this.updateDimensions);

    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color( 0xf0f0f0 );
    this.scene.add(new THREE.AmbientLight(0x8fbcd4, 0.4));
    this.container = document.createElement("div");
    this.myRef.appendChild(this.container);

    this.camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 20);
    this.camera.position.z = 8;
    this.scene.add(this.camera);
    this.controls = new OrbitControls(this.camera, this.container);
    this.pointLight = new THREE.PointLight(0xffffff, 1);
    this.camera.add(this.pointLight);
    this.geometry = this.createGeometry();
    this.material = new THREE.MeshPhongMaterial({
      color: Math.random() * 0xffffff,
      flatShading: true,
      morphTargets: true
    });
    this.mesh = new THREE.Mesh(this.geometry, this.material);
    this.mesh.rotation.x = Math.random() * Math.PI;
    this.mesh.rotation.y = Math.random() * Math.PI;
    this.mesh.rotation.z = Math.random() * Math.PI;
    this.scene.add(this.mesh);

    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setAnimationLoop(
      function() {
        this.renderer.render(this.scene, this.camera);
      }.bind(this)
    );
    this.container.appendChild(this.renderer.domElement);
    this.updateDimensions();
    this.renderer.render(this.scene, this.camera);
  }

  setSpherify(spherify) {
    this.mesh.morphTargetInfluences[0] = spherify;
    this.setState({ spherify });
  }

  setTwist(twist) {
    this.mesh.morphTargetInfluences[1] = twist;
    this.setState({ twist });
  }

  createGeometry() {
    const geometry = new THREE.BoxBufferGeometry(2, 2, 2, 32, 32, 32);
    // create an empty array to  hold targets for the attribute we want to morph
    // morphing positions and normals is supported
    geometry.morphAttributes.position = [];
    // the original positions of the cube's vertices
    const positions = geometry.attributes.position.array;
    // for the first morph target we'll move the cube's vertices onto the surface of a sphere
    const spherePositions = [];
    // for the second morph target, we'll twist the cubes vertices
    const twistPositions = [];
    const direction = new THREE.Vector3(1, 0, 0).normalize();
    const vertex = new THREE.Vector3();
    for (let i = 0; i < positions.length; i += 3) {
      var x = positions[i];
      var y = positions[i + 1];
      var z = positions[i + 2];
      spherePositions.push(
        x * Math.sqrt(1 - y * y / 2 - z * z / 2 + y * y * z * z / 3),
        y * Math.sqrt(1 - z * z / 2 - x * x / 2 + z * z * x * x / 3),
        z * Math.sqrt(1 - x * x / 2 - y * y / 2 + x * x * y * y / 3)
      );
      // stretch along the x-axis so we can see the twist better
      vertex.set(x * 2, y, z);
      vertex.applyAxisAngle(direction, Math.PI * x / 2).toArray(twistPositions, twistPositions.length);
    }

    // add the spherical positions as the first morph target
    geometry.morphAttributes.position[0] = new THREE.Float32BufferAttribute(spherePositions, 3);
    // add the twisted positions as the second morph target
    geometry.morphAttributes.position[1] = new THREE.Float32BufferAttribute(twistPositions, 3);
    return geometry;
  }

  animate() {
    requestAnimationFrame(this.animate.bind(this));
    this.controls.update();
    this.renderer.render(this.scene, this.camera);
  }

  updateDimensions() {
    if (this.myRef !== null) {
      this.width = this.myRef.clientWidth;
      this.height = this.myRef.clientHeight;
    }

    if (this.renderer !== undefined) {
      this.camera.aspect = this.width / this.height;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(this.width, this.height);
    }
  }

  /**
   * Invalidation handler, updating layout
   */
  componentWillUpdate() {
    const width = this.myRef.clientWidth;
    const height = this.myRef.clientHeight;

    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(width, height);
  }

  /**
   * Dipose
   */
  componentWillUnmount() {
    window.removeEventListener("resize", this.updateDimensions);
  }
}

export default Morpheus;
