'use strict';

// import * as THREE from 'https://cdn.skypack.dev/three@0.132.2/build/three.module.js';
// import { OrbitControls } from 'https://cdn.skypack.dev/three@0.132.2/examples/jsm/controls/OrbitControls.js';
// import { GLTFLoader } from 'https://cdn.skypack.dev/three@0.132.2/examples/jsm/loaders/GLTFLoader.js';

import * as THREE from 'three';
import { OrbitControls } from 'OrbitControls';
import { GLTFLoader } from 'GLTFLoader';

function main() {
          const canvas = document.querySelector('.webgl');
          var renderer = new THREE.WebGLRenderer(
  {
    canvas: canvas,
    antialias: true,
    alpha: true
  }
);
        renderer.setPixelRatio(devicePixelRatio);

        //make transparent background so we can see background image
        //renderer.setClearColor(0x000000, 0);
        renderer.setSize(window.innerWidth, window.innerHeight);

      // document.body.appendChild(renderer.domElement);
        
          const fov = 75;
          const near = 0.01;
          const far = 1000;
          const camera = new THREE.PerspectiveCamera(fov, window.innerWidth / window.innerHeight, near, far);
          camera.position.z = 100;
        
          const scene = new THREE.Scene();

          var ambientLight = new THREE.AmbientLight(0xffffff, 0.150); //ambient light
          scene.add(ambientLight);

          var time = new Date();
          var trueTime = time.getUTCHours();
          console.log(trueTime);

          var pointlight = new THREE.PointLight(0xfffff3,1.25);
           pointlight.position.y = 10;
          pointlight.position.z = 50;
          switch(true) {
            case( trueTime == 0):
            pointlight.position.x = -400;
            break;
            case( trueTime == 1):
            pointlight.position.x = -500;
            break;
            case(trueTime == 2):
            pointlight.position.x = -600;
            break;
            case(trueTime == 3):
            pointlight.position.x = 500;
            break;
            case(trueTime == 4):
            pointlight.position.x = 1800;
            break;
            case(trueTime == 5):
            pointlight.position.x = 1650;
            break;
            case(trueTime == 6):
            pointlight.position.x = 1500;
            break;
            case(trueTime == 7):
            pointlight.position.x = 1350;
            break;
            case(trueTime == 8):
            pointlight.position.x = 1200;
            break;
            case(trueTime == 9):
            pointlight.position.x = 1050;
            break;
            case(trueTime == 10):
            pointlight.position.x = 900;
            break;
            case(trueTime == 11):
            pointlight.position.x = 750;
            break;
            case(trueTime == 12):
            pointlight.position.x = 600;
            break;
            case(trueTime == 13):
            pointlight.position.x = 500;
            break;
            case(trueTime == 14):
            pointlight.position.x = 400;
            break;
            case(trueTime == 15):
            pointlight.position.x = 300;
            break;
            case(trueTime == 16):
            pointlight.position.x = 200;
            break;
            case(trueTime == 17):
            pointlight.position.x = 100;
            break;
            case(trueTime == 18):
            pointlight.position.x = 50;
            break;
            case(trueTime == 19):
            pointlight.position.x = 0;
            break;
            case(trueTime == 20):
            pointlight.position.x = -50;
            break;
            case(trueTime == 21):
            pointlight.position.x = -100;
            break;
            case(trueTime == 22):
            pointlight.position.x = -200;
            break;
            case(trueTime == 23):
            pointlight.position.x = -300;
            break;
            default:
              pointlight.position.x = 0;
          }
         
          
          pointlight.castShadow = true;
          scene.add(pointlight)

          const controls = new OrbitControls(camera, canvas)
          controls.enableDamping = true;
          controls.enablePan = false;

          ///////////Background Image/////////////
          const earthTexture = new THREE.TextureLoader().load('../images/2_no_clouds_4k.jpg');
          const earthBump = new THREE.TextureLoader().load('../images/elev_bump_16k.jpg');
          const earthSpec = new THREE.TextureLoader().load('../images/2k_earth_specular_map (1).jpg');
          const earthAtmosphere = new THREE.TextureLoader().load('../images/2k_earth_clouds.jpg');
          const starGlobe = new THREE.TextureLoader().load('../images/galaxy_starfield.png');

          var setGlobe = new THREE.Mesh(
            new THREE.SphereBufferGeometry(500,40,20),
            new THREE.MeshBasicMaterial({
              map: starGlobe,
              side: THREE.DoubleSide,

            })
          );
          scene.add(setGlobe);

          /////////////////////Globe////////////////////////

        var mySphere = new THREE.Mesh(
          new THREE.SphereGeometry(20,100,100),
          new THREE.MeshPhongMaterial({
              map: earthTexture,
              bumpMap: earthBump,
              bumpScale: 0.8,
          })
        );
        scene.add(mySphere)

        var sphereAtmosphere = new THREE.Mesh(
          new THREE.SphereGeometry(20.2,100,100),
          new THREE.MeshBasicMaterial({
              map: earthAtmosphere,
              transparent: true,
              opacity: 0.65
          })
        );
        scene.add(sphereAtmosphere)

        
        ////////////Function to convert lat and long to cartesian coordinates///////////////////////
          const radius = 25;

        const latLongToVector3 = (lat, lon, radius) => {
          var phi   = (90-lat)*(Math.PI/180);
          var theta = (lon+180)*(Math.PI/180);
          
          var x = -((radius) * Math.sin(phi)*Math.cos(theta));
          var z = ((radius) * Math.sin(phi)*Math.sin(theta));
          var y = ((radius) * Math.cos(phi));

        
        
          return new THREE.Vector3(x, y, z);
        };
        
      
      

        ///////////Adding Marker Sphere///////////////
        var marker = new THREE.Mesh(
          new THREE.SphereGeometry(0.5,40,20),
          new THREE.MeshBasicMaterial({
              color: 0xfa0000,
          })
        );
        marker.name = "ISS";
        scene.add(marker)

        /////////////Blink the marker////////////////////

        var blinkMarker = scene.getObjectByName("ISS");
        blinkMarker.visible = true;
        function toggleBlinker() {
          blinkMarker.visible = !blinkMarker.visible
        }
        setInterval(toggleBlinker, 500);

        // Define a function to update the marker position

        var pointlight = new THREE.PointLight(0xfffff3,1.45);
        scene.add(pointlight)

      
        const updateMarker = (lat, lon) => {
          // Convert the latitude and longitude coordinates to Cartesian coordinates
          const position = latLongToVector3(lat, lon, radius);
        
          //Update the position of the marker
          marker.position.x = position.x;
          marker.position.y = position.y;
          marker.position.z = position.z;
          obj.position.x = position.x;
          obj.position.y = position.y;
          obj.position.z = position.z;
        };

        


        ////////Load 3d ISS//////////////////////
        let obj;
        const loader = new GLTFLoader();

        
        loader.load('../3december_2021_-_international_space_station/scene.gltf', function(gltf){
          obj = gltf.scene;
          obj.rotation.y = 0;
          obj.scale.set(0.06,0.06,0.06)
          scene.add(obj);
          camera.lookAt(obj.position);
          setInterval(() => {
            obj.rotation.x += 0.005;
            obj.rotation.y += 0.005;
          }, 50);
        });


        ///////////////Call ISS API///////////////////////

        async function updateISS() {
          const issResponse = await fetch('https://api.wheretheiss.at/v1/satellites/25544');
          const issData = await issResponse.json();
          
          const latitude = Math.ceil(issData.latitude);
          const longitude = Math.ceil(issData.longitude);
          const altitude = Math.floor(issData.altitude * 0.621371);
          const velocity = Math.floor(issData.velocity * 0.621371);

          document.getElementById("latitude").innerHTML = issData.latitude;
          document.getElementById("longitude").innerHTML = issData.longitude;
          document.getElementById("altitude").innerText = altitude + " miles";
          document.getElementById('velocity').innerText = velocity + " mph";

          // const getLocation = await fetch(`https://api.wheretheiss.at/v1/coordinates/${latitude},${longitude}`);
          // const locationData = await getLocation.json();
          
          //Update the position of the marker using the latitude and longitude values
          updateMarker(latitude, longitude);
            
        };

        
        setInterval(updateISS, 5000);

        /////////////////Render function////////////////////////////////


            function render() {
            sphereAtmosphere.rotation.y += 0.001;
            
            renderer.render(scene, camera);
        
            requestAnimationFrame(render);

            window.addEventListener('resize', function() {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
          })

        
      }
    
      requestAnimationFrame(render);
    }
    
    main();
  
    
