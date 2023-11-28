import './style.css'
import * as THREE from 'three'
import gsap from "gsap"
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls"
import { FontLoader } from 'three/addons/loaders/FontLoader.js';
import { TextGeometry } from 'three/addons/geometries/TextGeometry.js';
// setting up the scene
const scene = new THREE.Scene()


// camera
const camera=new THREE.PerspectiveCamera(75,window.innerWidth/window.innerHeight,0.1,1000)
camera.position.setZ(30)
scene.add(camera)

const canvas=document.querySelector('#bg')
// renderer
const renderer=new THREE.WebGLRenderer({canvas})

// light
const pointlight=new THREE.PointLight( 0xff0000, 1, 100 );
pointlight.position.set(7,2,8)
scene.add(pointlight)

const ambientLight=new THREE.AmbientLight(0xffffff)
scene.add(ambientLight)

// helpers
// const  lightHelper=new THREE.PointLightHelper(pointlight)
// scene.add(lightHelper)
// const gridHelper=new THREE.GridHelper(200,50)
// scene.add(gridHelper)

// elements

const geometry=new THREE.TorusGeometry(10,4,17,100)
const ring=new THREE.TextureLoader().load('/images/guillermo-ferla-Oze6U2m1oYU-unsplash.jpg')
const material= new THREE.MeshStandardMaterial({map:ring})
const  torus=new THREE.Mesh(geometry,material)
// scene.add(torus)
const loader = new FontLoader();


const font = loader.load(
	// resource URL
	'/font/avenir-black_DcRH1/Avenir Black_Regular.json',

	// onLoad callback
	function ( font ) {
    var textGeometry = new TextGeometry('BROTOTYPE', {
      font: font,
		size: 2,
		height: .2,
		curveSegments: 12,
		bevelEnabled: true,
		bevelThickness: .01,
		bevelSize: .1,
		bevelOffset: 0,
		bevelSegments: 2
    });
    var textMaterial = new THREE.MeshBasicMaterial({color: 0xffffff});
    var textMesh = new THREE.Mesh(textGeometry, textMaterial);


  textMesh.position.set(-7, -1, 0);
  scene.add(textMesh);
	},

	// onProgress callback
	function ( xhr ) {
		console.log( (xhr.loaded / xhr.total * 100) + '% loaded' );
	},

	// onError callback
	function ( err ) {
		console.log( 'An error happened' );
	}
);



function addStars(){
  const geometry=new THREE.SphereGeometry(0.25,24,24)
  const material=new THREE.MeshStandardMaterial({color:0xffffff})
  const star=new THREE.Mesh(geometry,material)
  const[x,y,z]=Array(3).fill().map(()=>THREE.MathUtils.randFloatSpread(100))
  star.position.set(x,y,z)
  scene.add(star)
}

Array(200).fill().forEach(addStars)
let img=[
  "/images/blocks/file.jpeg",
  "/images/blocks/IMG_20230904_170337.jpg",
  "/images/blocks/IMG_20230908_175259.jpg",
  "/images/blocks/IMG_20230912_182629.jpg",
  "/images/blocks/IMG_20230915_133455.jpg",
  "/images/blocks/IMG_20231005_223412.jpg",
  "/images/blocks/IMG_20231005_223757.jpg",
  "/images/blocks/IMG_20231010_172513.jpg",
  "/images/blocks/IMG_20231012_142714.jpg",
  "/images/blocks/IMG_20231018_100149.jpg",
  "/images/blocks/IMG_20231025_181143.jpg",
  "/images/blocks/IMG_20231025_181221.jpg",
  "/images/blocks/IMG_20231025_181902.jpg",
  "/images/blocks/IMG_20231026_151923.jpg",
  "/images/blocks/IMG_20231027_132231.jpg",
  "/images/blocks/IMG_20231104_102558.jpg"

]
img.forEach((ele)=>{
  const image=new THREE.TextureLoader().load(ele,()=>{
    const profileBox=new THREE.Mesh(
      new THREE.BoxGeometry(3,3,3),
      new THREE.MeshBasicMaterial({
        map:image,
        color: 0xffffff,
      })
    )
    const[x,y,z]=Array(3).fill().map(()=>THREE.MathUtils.randFloatSpread(50))
    profileBox.position.set(x,y,z)
    scene.add(profileBox)
  })
  
})

const space=new THREE.TextureLoader().load('/images/guillermo-ferla-Oze6U2m1oYU-unsplash.jpg')
// scene.background=space

// const akv=new THREE.TextureLoader().load('/images/IMG_2091.jpg')
// const profileBox=new THREE.Mesh(
//   new THREE.BoxGeometry(3,3,3),
//   new THREE.MeshBasicMaterial({
//     map:akv,
//     color: 0xffffff,
//   })
// )
// profileBox.position.z=23
// profileBox.position.y=4
// profileBox.position.x=1
// scene.add(profileBox)



// controlls
const controls=new OrbitControls(camera, canvas)
controls.enableDamping=true
// controls.enablePan=false
// controls.enableZoom=false
controls.autoRotate=true
controls.autoRotateSpeed = 2; 



window.addEventListener( 'resize', onWindowResize );

function onWindowResize() {

  windowHalfX = window.innerWidth / 2;

  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize( window.innerWidth, window.innerHeight );

}

renderer.setPixelRatio(window.devicePixelRatio)
renderer.setSize(window.innerWidth,window.innerHeight)

// loopinhg the renderer
function animate(){
  requestAnimationFrame(animate)
  controls.update()
  // torus.rotation.x+=0.01
  // torus.rotation.y+=0.01
  torus.rotation.z+=0.01
  
  // addStars()
  renderer.render(scene,camera)
}
animate()


// const t1= gsap.timeline({defaults:{duration:1}})
// t1.fromTo('profileBox',{opacity:0},{opacity:1})