document.addEventListener("DOMContentLoaded", () => {
    // GSAP Animaciones iniciales
    gsap.from(".nav-links li", {
        duration: 1,
        y: -50,
        opacity: 0,
        stagger: 0.3,
        ease: "power3.out"
    });

   /* gsap.from(".hero-content", {
        duration: 1.5,
        y: 100,
        opacity: 0,
        ease: "power3.out"
    });*/

    // Configuración de la animación de fondo con Three.js
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ canvas: document.querySelector("#bgCanvas") });
    
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.position.setZ(30);

    const geometry = new THREE.TorusGeometry(10, 3, 16, 100);
    const material = new THREE.MeshStandardMaterial({ color: 0x007bff });
    const torus = new THREE.Mesh(geometry, material);

    scene.add(torus);

    const pointLight = new THREE.PointLight(0xffffff);
    pointLight.position.set(5, 5, 5);
    scene.add(pointLight);

    function animate() {
        requestAnimationFrame(animate);
        torus.rotation.x += 0.01;
        torus.rotation.y += 0.005;
        renderer.render(scene, camera);
    }
    
    animate();

    // Animaciones de transición entre páginas con Barba.js
    barba.init({
        transitions: [{
            leave({ current }) {
                return gsap.to(current.container, { opacity: 0, duration: 0.5 });
            },
            enter({ next }) {
                return gsap.from(next.container, { opacity: 0, duration: 0.5 });
            }
        }]
    });
});

document.querySelector('.contact-form').addEventListener('submit', async function(event) {
    event.preventDefault();  // Detenemos el envío del formulario

    const name = event.target.name.value.trim();
    const email = event.target.email.value.trim();
    const message = event.target.message.value.trim();

    if (name && email && message) {
        alert(`Gracias por tu mensaje, ${name}! Me pondré en contacto contigo pronto.`);

        // Definir los datos del mensaje
        const rawData = {
           
            
                    "email": email,
                    "name": name,
					 "message": message
                
            
           
        };

        // Usar async/await para manejar el fetch de manera sincrónica
        try {
			const queryParams = `email=${encodeURIComponent(email)}&name=${encodeURIComponent(name)}&message=${encodeURIComponent(message)}`;
            const response = await fetch('https://pqzcqh2xrgnei7ykw5z5sbcwui0dfied.lambda-url.us-west-1.on.aws/?'+queryParams, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                   
                }
               // body: JSON.stringify(rawData)
            });

            // Verificar si la respuesta es exitosa
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            console.log('Success:', data);

        } catch (error) {
            console.error('Error:', error);
        }

    } else {
        alert('Por favor, rellena todos los campos antes de enviar.');
    }
});



