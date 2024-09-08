

//***// Importing Items
import './style.css'
import * as THREE from 'three'
import gsap from 'gsap'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js' //import { OrbitControls } from 'three/addons/controls/OrbitControls.js' // same code but with string text change
















//***// Textures

//
    const loadingManager = new THREE.LoadingManager()
    const textureLoader = new THREE.TextureLoader()
    const matcapTextureblack = textureLoader.load('./textures/matcaps/black0.jpg')
    //const matcapTextureblackglow = texture.load
    const matcapTextureouter = textureLoader.load('./textures/matcaps/outerfinal.png')
    matcapTextureblack.colorSpace = THREE.SRGBColorSpace
    matcapTextureouter.colorSpace = THREE.SRGBColorSpace

//









//***// Cursor

//
const cursor = { x: 0, y: 0 }
const targetPosition = { x: 0, y: 0 }; // Target camera position
window.addEventListener('mousemove', (event) => 
    { 
        cursor.x = - (event.clientX / sizes.width - 0.5) // 0.5 is making it like a graph. 0 at center and + - on sides
        cursor.y = event.clientY / sizes.height - 0.5 // - in x will help in movement of camera or objects with cursor movement
        //console.log(event.clientX, event.clientY)  // listening cursor values but goes beyond screen
        //console.log(cursor.x, cursor.y)
        // Use GSAP to smoothly animate camera position

        if (sizes.width > 1023)
        {
            gsap.to(targetPosition, {
                duration: 1, // Adjust the duration for smoothness
                x: cursor.x * Math.PI * 0.3,
                y: cursor.y * Math.PI * 0.3,
                ease: 'power2.out', // Easing function
                onUpdate: () => {
                    // Update camera position during animation
                    camera.position.x = targetPosition.x;
                    camera.position.y = targetPosition.y;
                    camera.lookAt(centerPosition);
                }
            });
        }

    // Update centerPosition for camera lookAt
    centerPosition.x = cursor.x * Math.PI * 0.03;
    centerPosition.y = cursor.y * Math.PI * 0.03;
})
//








//***// Canvas

//
const canvas = document.querySelector('canvas.webgl')
//













//***// Scene

//
    
//

const scene = new THREE.Scene() //Creating scene















// Light in the scene
//const ambientLight = new THREE.AmbientLight('#ffffff', 0.6) // put consistent light in the scene 
//scene.add(ambientLight) 
//const pointLight = new THREE.PointLight('#ffffff', 1.2) // put a light like a bulb
//pointLight.position.set(0, 0, 0)
//pointLight.position.set(0, 0, 0)
//scene.add(pointLight)








//***// Screen Size

//
    
//

const sizes = 
{
    width: window.innerWidth,
    height: window.innerHeight
}
window.addEventListener('resize', () => //updating the camera in continuous listening event
{
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight
    camera.aspect = sizes.width / sizes.height //updating the aspect ratio for camera window
    camera.updateProjectionMatrix()
    renderer.setSize(sizes.width, sizes.height) //updating the renderer
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)) //update device pixel ratio in runtime if it changes when moving window to another screen
})













//***// Geometry, Material, Mesh

//
    const geometrysphere = new THREE.SphereGeometry(0.8, 64, 64)
    //const geometrybox = new THREE.BoxGeometry(2, 2, 2)
    const materialblack = new THREE.MeshMatcapMaterial({ matcap: matcapTextureblack })
    //const materialcenter = new THREE.MeshBasicMaterial({ color: '#ffffff' })
    const materialouter = new THREE.MeshMatcapMaterial({ matcap: matcapTextureouter })
    
    
    
    materialouter.side = THREE.DoubleSide
    const meshblack = new THREE.Mesh(geometrysphere, materialblack)
    //const meshcenter = new THREE.Mesh(geometrysphere, materialcenter)
    const meshouter = new THREE.Mesh(geometrysphere, materialouter)
    
    scene.add(meshblack)
    //scene.add(meshcenter)
    scene.add(meshouter)
    
    if (sizes.width < 1024)//mobile
    {
        meshblack.position.set(0, 0, 0)
        //meshcenter.scale.set(0.04, 0.04, 0.04)
        meshouter.scale.set(10, 10, 10)
        meshblack.scale.set(0.9, 0.9, 0.9)
        
    }
    else
    {
        meshblack.position.set(0, 0, 0)
        //meshcenter.scale.set(0.04, 0.04, 0.04)
        meshouter.scale.set(10, 10, 10)
        meshblack.scale.set(0.9, 0.9, 0.9)
        
    }
    






    

    // Group to hold all particles
    const particleGroup = new THREE.Group();
    scene.add(particleGroup);

    // Particle system parameters
    const particles = [];
    const maxParticles = 1800;
    //const initialParticleCount = 800;
    const particleCountPerFrame = 1;  // Create this many particles per frame
    const particleSize = 0.003;
    let particleSpeed = 0.0008; // 0.0008 for 60fps // 0.0016 for 30
    const maxDistance = 8;  // Radius around the sphere where particles are generated

    const geometry = new THREE.SphereGeometry(particleSize, 8, 8);
        const material = new THREE.MeshBasicMaterial({ color: '#7CD5F6' }); //D6F5FF
        


    // Particle creation function
    function createParticle() {
        const particle = new THREE.Mesh(geometry, material);

        // Generate particle at a random position around the sphere
        const angle1 = Math.random() * Math.PI * 2;
        const angle2 = Math.random() * Math.PI;
        const distance = Math.random() * maxDistance + 2; // Random distance from the center
        particle.position.x = Math.sin(angle2) * Math.cos(angle1) * distance;
        particle.position.y = Math.sin(angle2) * Math.sin(angle1) * distance;
        particle.position.z = Math.cos(angle2) * distance;
        const scale = (Math.random() * (1 - 0.5)) + 0.5;
        particle.scale.set(scale, scale, scale)

        particle.userData.velocity = new THREE.Vector3(
            -particle.position.x * particleSpeed,
            -particle.position.y * particleSpeed,
            -particle.position.z * particleSpeed
        );

        

        //scene.add(particle);
        particleGroup.add(particle);  // Add particle to the group
        particles.push(particle);
    }
//

















//***// Camera

//
    const camera = new THREE.PerspectiveCamera(40, sizes.width / sizes.height, 1, 1000) // 2.8, 1000
    if (sizes.width < 1024)
    {
        camera.position.set(0, 0, 5)
    }
    else
    {
        camera.position.set(0, 0, 4)
    }
    
    scene.add(camera)
//











//***// Orbit Camera Controls
    let desktopview = true
//
    const controls = new OrbitControls(camera, canvas)
    if (sizes.width < 1024)
    {
        controls.enableDamping = true
        controls.maxPolarAngle = Math.PI * 0.7
        controls.minPolarAngle = Math.PI * 0.3
        controls.enableZoom = false
        controls.enablePan = false
        controls.enabled = true
        controls.update()
        desktopview = false
    }
    else
    {
        controls.enabled = false
        desktopview = true
    }
//










    
//

const renderer = new THREE.WebGLRenderer
(
    {
        canvas: canvas
    }
)
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))//limit pixel ration between device and max 2. // renderer.setPixelRatio(window.devicePixelRatio) //set device pixel ratio
//renderer.render(scene, camera)













// Creating Clock

//
    
//

const clock = new THREE.Clock()
let frameCount = 0;
let countingFrames = true;
let fpsgenericcalculate = 0;








let lastParticleTime = 0;  // Tracks when the last particle was created
const particleInterval = 1 / 30;  // Time interval for particle creation (e.g., 1/30 seconds for 30 particles per second)
let startTime = performance.now();  // Initial time reference
let elapsedTimenew = 0;  // Tracks total elapsed time
//let maxDeltaTime = 0.2;  // Max delta time allowed to avoid large time jumps (0.2 seconds = 200ms)




//
    let centerPosition = new THREE.Vector3
    let particlevaluemax = 0
    let maxlimit = 0
//






const tick = () =>
{
    if (countingFrames) {
        frameCount++;
        if (clock.getElapsedTime() > 1) {
            countingFrames = false; // Stop counting frames
        }
    }
    //else {
    
    //}

    //frameCount++;
    //if (clock.getElapsedTime() > 1) {
    //    frameCount = 0;
    //    countingFrames = false; // Stop counting frames
    //}

    if (countingFrames == false)
    {
        fpsgenericcalculate = 60 / frameCount;
        let fpsroundedValue = Math.round(fpsgenericcalculate);
        particleSpeed = (0.048 / frameCount) * fpsroundedValue; // gives 0.0008 for 60fps
        //console.log(fpsroundedValue);
        //console.log(fpsgenericcalculate);
        //console.log(particleSpeed);
    }




    //Using Clock
    const elapsedTime = clock.getElapsedTime()

    

    

    if (sizes.width < 1024)
    {
        meshblack.position.set(0, 0, 0)

        if (desktopview == true)
        {
            camera.position.set(0, 0, 5)
            desktopview = false 
        }
        
        controls.maxPolarAngle = Math.PI * 0.7
        controls.minPolarAngle = Math.PI * 0.3
        controls.enableZoom = false
        controls.enablePan = false
        controls.enabled = true
        controls.update()
        
        
    }
    else 
    {
        meshblack.position.set(0, 0, 0)

        if (desktopview == false)
        {
            camera.position.set(0, 0, 4)
            camera.rotation.set(0, 0, 0)
            desktopview = true
        }


        controls.enabled = false

    }

   
    
    
    





    let currentTime = performance.now();  // Get the current time
    let deltaTime = (currentTime - startTime) / 1000;  // Convert to seconds

    // Prevent large jumps in time due to tab inactivity (like after 1 minute away)
    //if (deltaTime > maxDeltaTime) {
    //   deltaTime = maxDeltaTime;  // Cap deltaTime to a reasonable value
    //}

    elapsedTimenew += deltaTime;  // Update elapsed time in seconds
    startTime = currentTime;  // Reset start time for the next frame
    
    // Rotate the particle group around the Y-axis
    particleGroup.rotation.y = elapsedTime / 6;
    particleGroup.rotation.x = Math.sin(elapsedTime / 12);
    particleGroup.rotation.z = Math.sin(elapsedTime / 12);

    // Track how many particles have reached the center
    let particlesToRemove = [];

    // Move particles towards the sphere center
    particles.forEach(particle => {
        //particle.position.add(particle.userData.velocity);

        // If the particle reaches near the sphere center, remove it // stuck at sides
        //if (particle.position.length() < 0.9) {
        //    scene.remove(particle);
        //    particles.splice(particles.indexOf(particle), 1);
        //}

        // If the particle reaches near the sphere center, remove it // remove from group
        //if (particle.position.length() < 0.9) {
        //    particleGroup.remove(particle); // Remove particle from the group
        //    particles.splice(particles.indexOf(particle), 1); // Remove from the array
        //}
        //});

        if (particle.position.length() >= 0.85) {
            // Move the particle towards the center
            particle.position.add(particle.userData.velocity);
            //const velocity = particle.userData.velocity.clone().multiplyScalar(deltaTime);
            //particle.position.add(velocity);
        } else {
            // Particle has reached the center, so hold it in place by setting velocity to zero
            particle.userData.velocity.set(0, 0, 0);
    
            // If lifeTime is not set, set it between 1 to 10 seconds
            if (!particle.userData.lifeTime) {
                particle.userData.lifeTime = 40;//Math.random() * 9 + 1; // Random time between 1 and 10 seconds
                particle.userData.startTime = elapsedTime; // Record when the timer starts
            }
    
            // If the lifetime has elapsed, remove the particle
            if (elapsedTime - particle.userData.startTime > particle.userData.lifeTime) {
                particleGroup.remove(particle); // Remove particle from the group
                particles.splice(particles.indexOf(particle), 1); // Remove from the array
            }
        }
    });


    // Check if enough time has passed to create a new particle
    if (elapsedTimenew - lastParticleTime >= particleInterval) {
        if (particles.length < maxParticles) {
            if (countingFrames == false)
            {
                //createParticle();  // Create a new particle 
            }
            createParticle();  // Create a new particle
        }
        lastParticleTime = elapsedTimenew;  // Reset last particle creation time
    }

    //console.log(particlevaluemax)

    //Rendering
    renderer.render(scene, camera)


    window.requestAnimationFrame(tick)
}


tick()
















