
document.addEventListener("DOMContentLoaded", (event) => {

    document.getElementById('submitBtn').addEventListener('click', function() {
        const form = document.getElementById('createAccountForm');
        const formData = new FormData(form);
        const inputs = document.querySelectorAll('.createAccountInput');

        fetch('/api/members/createAccount', {
            method: 'POST',
            body: formData
        })
            .then(response => response.json())
            .then(data => {
                // Clear previous error styles
                inputs.forEach(input => {
                    input.style.border = '';
                    input.style.color = '';
                });

                if (data.status === "success") {
                    inputs.forEach(input => {
                        input.style.outline = '1px solid #A2CA71';
                        input.style.color = '#A2CA71';
                    });
                } else {
                    if (data.firstNameError) {
                        const firstNameInput = document.getElementById('firstName');
                        const inputContainer = document.getElementById('input-container-first-name');
                        const firstNameError = document.createElement('p');
                        firstNameInput.style.outline = '1px solid #a34646';
                        firstNameInput.style.color = '#a34646';
                        firstNameError.textContent = data.firstNameError;
                        inputContainer.appendChild(firstNameError);

                    }else {
                        const firstNameInput = document.getElementById('firstName');
                        firstNameInput.style.outline = '1px solid #A2CA71';
                        firstNameInput.style.color = '#A2CA71';
                    }

                    if (data.lastNameError) {
                        const lastNameInput = document.getElementById('lastName');
                        const inputContainer = document.getElementById('input-container-last-name');
                        const lastNameError = document.createElement('p');
                        lastNameInput.style.outline = '1px solid #a34646';
                        lastNameInput.style.color = '#a34646';
                        lastNameError.textContent = data.lastNameError;
                        inputContainer.appendChild(lastNameError);

                    }else {
                        const firstNameInput = document.getElementById('lastName');
                        firstNameInput.style.outline = '1px solid #A2CA71';
                        firstNameInput.style.color = '#A2CA71';
                    }

                    if (data.usernameError) {
                        const usernameInput = document.getElementById('username');
                        const inputContainer = document.getElementById('input-container-username');
                        const usernameError = document.createElement('p');
                        usernameInput.style.outline = '1px solid #a34646';
                        usernameInput.style.color = '#a34646';
                        usernameError.textContent = data.usernameError;
                        inputContainer.appendChild(usernameError);
                    }else {
                        const firstNameInput = document.getElementById('username');
                        firstNameInput.style.outline = '1px solid #A2CA71';
                        firstNameInput.style.color = '#A2CA71';
                    }

                    if (data.emailError) {
                        const emailInput = document.getElementById('email');
                        const inputContainer = document.getElementById('input-container-email');
                        const emailError = document.createElement('p');
                        emailInput.style.outline = '1px solid #a34646';
                        emailInput.style.color = '#a34646';
                        emailError.textContent = data.emailError;
                        inputContainer.appendChild(emailError);
                    }else {
                        const firstNameInput = document.getElementById('email');
                        firstNameInput.style.outline = '1px solid #A2CA71';
                        firstNameInput.style.color = '#A2CA71';
                    }

                    if (data.passwordError) {
                        const passwordInput = document.getElementById('password');
                        const inputContainer = document.getElementById('input-container-password');
                        const passwordError = document.createElement('p');
                        passwordInput.style.outline = '1px solid #a34646';
                        passwordInput.style.color = '#a34646';
                        passwordError.textContent = data.passwordError;
                        inputContainer.appendChild(passwordError);
                    }else {
                        const firstNameInput = document.getElementById('password');
                        firstNameInput.style.outline = '1px solid #A2CA71';
                        firstNameInput.style.color = '#A2CA71';
                    }
                }
            })
            .catch(error => {
                console.error('Error:', error);
            });
    });

    document.getElementById('loginSubmitBtn').addEventListener('click', function() {
        const form = document.getElementById('loginAccountForm');
        const formData = new FormData(form);

        fetch('/api/members/login', {
            method: 'POST',
            body: formData
        })
            .then(response => response.json())
            .then(data => {
                if(data.status === "success"){
                    const emailInput = document.getElementById('email-login');
                    const passwordInput = document.getElementById('password-login');
                    emailInput.style.outline = '1px solid #A2CA71';
                    emailInput.style.color = '#A2CA71';
                    passwordInput.style.outline = '1px solid #A2CA71';
                    passwordInput.style.color = '#A2CA71';
                    setTimeout(() => {
                        document.getElementById('guestLogin').click();
                    }, 500)
                }else {
                    if(data.emailError) {
                        const emailInput = document.getElementById('email-login');
                        const inputContainer = document.getElementById('input-login-container-email');
                        const emailError = document.createElement('p');
                        emailInput.style.outline = '1px solid #a34646';
                        emailInput.style.color = '#a34646';
                        emailError.textContent = data.emailError;
                        inputContainer.appendChild(emailError);
                    }else if(data.passwordError) {
                        const passwordInput = document.getElementById('password-login');
                        const inputContainer = document.getElementById('input-login-container-password');
                        const passwordError = document.createElement('p');
                        passwordInput.style.outline = '1px solid #a34646';
                        passwordInput.style.color = '#a34646';
                        passwordError.textContent = data.passwordError;
                        inputContainer.appendChild(passwordError);
                    }else if(data.message) {
                        const passwordInput = document.getElementById('password-login');
                        const inputContainer = document.getElementById('input-login-container-password');
                        const message = document.createElement('p');
                        passwordInput.style.outline = '1px solid #a34646';
                        passwordInput.style.color = '#a34646';
                        message.textContent = data.message;
                        inputContainer.appendChild(message);
                    }
                }
            })
            .catch(error => {
                console.error('Error:', error);
            });
    })

    document.getElementById('formSwitch').addEventListener('click', function() {
        const formHeader = document.getElementById('formActive');
        const formSwitchTitle = document.getElementById('formSwitchTitle');
        const registerForm = document.getElementById('createAccountForm');
        const loginForm = document.getElementById('loginAccountForm');

        if(formSwitchTitle.textContent == 'LOGIN'){
            formSwitchTitle.textContent = 'REGISTER';
            gsap.to(formHeader, {
                opacity: 0,
                duration: 0.2,
                ease: 'power3.inOut',
                onComplete: () => {
                    formHeader.style.opacity = '1';
                    formHeader.textContent = 'Login';
                }
            })
            gsap.to(registerForm, {
                opacity: 0,
                duration: 0.2,
                ease: 'power3.inOut',
                onComplete: () => {
                    loginForm.style.opacity = '1';
                    loginForm.style.pointerEvents = 'all';
                }
            })
        }else {
            formSwitchTitle.textContent = 'LOGIN';
            gsap.to(formHeader, {
                opacity: 0,
                duration: 0.2,
                ease: 'power3.inOut',
                onComplete: () => {
                    formHeader.style.opacity = '1';
                    formHeader.textContent = 'Create account';
                }
            })
            gsap.to(loginForm, {
                opacity: 0,
                duration: 0.2,
                ease: 'power3.inOut',
                onComplete: () => {
                    registerForm.style.opacity = '1';
                    registerForm.style.pointerEvents = 'all';
                }
            })
        }

    })

    document.getElementById('guestLogin').addEventListener("click", function() {
        const LoginOptionsDialogue = document.querySelector('.options');
        LoginOptionsDialogue.style.opacity = '0';
        LoginOptionsDialogue.style.pointerEvents = 'none';

        gsap.to(backgroundAnimation, {
            delay: 0.6,
            duration: 1.4,
            ease: Expo.easeInOut,
            scale: 1,
            onComplete: () => {
                backgroundAnimation.style.transition = 'all 1.2s ease';
                openButton.style.pointerEvents = 'none';
                backgroundAnimation.style.filter = 'blur(0)';
                menuButton.style.opacity = '1';
                menuButton.style.pointerEvents = 'all';
                brandName.style.opacity = '1';
                brandName.style.pointerEvents = 'all';
                accountButton.style.opacity = '1';
                accountButton.style.pointerEvents = 'all';
                landingPage.style.pointerEvents = 'none';
            }
        })

    })

    fetch('/api/getAllLocations')
        .then(response => response.json())
        .then(locations => {
            const locationsList = document.getElementById('locationsList');
            locations.forEach(location => {
                const divParent = document.createElement('div');
                divParent.classList.add('location-div')
                const h2 = document.createElement('h2');
                const divChild = document.createElement('div');
                divChild.classList.add('location-div-extra');
                const i = document.createElement('i');
                const p = document.createElement('p');
                i.classList.add('fa-regular');
                i.classList.add('fa-heart');
                i.classList.add('fa-xl');

                let relativeUpvotes = parseInt(`${location.upvotes}`, 10);

                divChild.addEventListener('click', function() {
                    if (i.classList.contains('fa-regular')) {
                        i.classList.remove('fa-regular');
                        i.classList.add('fa-solid');
                        i.style.color = '#d52c2c';
                        divChild.style.backgroundColor = 'rgba(213, 44, 44, 0.32)'
                        relativeUpvotes = relativeUpvotes + 1
                        p.textContent = relativeUpvotes;
                    } else {
                        i.classList.remove('fa-solid');
                        i.classList.add('fa-regular');
                        i.style.color = '';
                        divChild.style.backgroundColor = '';
                        relativeUpvotes = relativeUpvotes - 1
                        p.textContent = relativeUpvotes;
                    }
                })

                divChild.appendChild(i);
                p.textContent = `${location.upvotes}`;
                divChild.appendChild(p);
                h2.className = 'menu-item';
                h2.textContent = `${location.name}, ${location.country}`;
                h2.dataset.imagePath = `${location.image}`;
                divParent.appendChild(h2)
                divParent.appendChild(divChild);
                locationsList.appendChild(divParent);
            });
            handleMenuItems();
        })
        .catch(error => console.error('Error fetching locations:', error));

    const menuButton = document.querySelector('.menu-element');
    const brandName = document.querySelector('.logo-name');
    const accountButton = document.querySelector('.account-element');
    const openButton = document.getElementById('OpenButton');
    const backgroundAnimation = document.getElementById('BackAnim');
    const landingPage = document.querySelector('.landing-page');
    const verticalItemList = document.querySelector('.vertical-menu-list');
    const header = document.getElementById('header');
    const accountPage = document.querySelector('.account-page');
    const closeAccountButton = document.getElementById('close-account-button');
    const cursorImage = document.querySelector('.cursor');
    const imageHovered = document.querySelector('.imageHovered');
    const openPopup = document.querySelector('.options');

    function handleMenuItems() {
        const menuItems = document.querySelectorAll('.location-div');

        gsap.set(".location-div", { x: -20 });

        menuItems.forEach((location, index) => {

            const h2 = location.querySelector('.menu-item')
            const upvotes = location.querySelector('.location-div-extra');

            location.addEventListener('mouseover', function () {
                const imgSrc = "./assets/" + h2.dataset.imagePath;
                const img = document.createElement('img');
                img.classList.add('imageHovered');
                img.src = imgSrc;
                img.style.clipPath = 'polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)';
                cursorImage.appendChild(img);

                gsap.to(img, {
                    clipPath: 'polygon(0% 100%, 100% 100%, 100% 0%, 0% 0%)',
                    duration: 1,
                    ease: 'power3.out'
                });

                gsap.to(upvotes, {
                    opacity: 1,
                    pointerEvents: 'all',
                    duration: 0.4,
                    ease: 'power3.out'
                })
            });

            location.addEventListener('mouseout', function() {
                const imgs = cursorImage.getElementsByTagName('img');
                if(imgs.length) {
                    const lastImg = imgs[imgs.length - 1];
                    Array.from(imgs).forEach((img, index) => {
                        if(img !== lastImg) {
                            gsap.to(img, {
                                clipPath: 'polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)',
                                duration: 1,
                                ease: 'power3.out',
                                onComplete: () => {
                                    setTimeout(() => {
                                        img.remove();
                                    }, 1000);
                                }
                            });
                        }
                    });

                    gsap.to(lastImg, {
                        clipPath: 'polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)',
                        duration: 1,
                        ease: 'power3.out',
                        delay: 0.25
                    });

                }

                gsap.to(upvotes, {
                    opacity: 0,
                    pointerEvents: 'none',
                    duration: 0.4,
                    ease: 'power3.out'
                })

            });
        });

        document.addEventListener('mousemove', function(e) {
            gsap.to(cursorImage, {
                x: e.clientX - 120,
                y: e.clientY - 160,
                duration: 1,
                ease: 'power3.out'
            });
        });
    }

    menuButton.addEventListener("click", function () {

        if (window.innerWidth <= 1250) {
            verticalItemList.style.backdropFilter = 'blur(10px)';
        }

        if (menuButton.innerHTML == "DISCOVER") {
            menuButton.innerHTML = "CLOSE";

            verticalItemList.scrollTop = 0;

            gsap.to(".location-div", {
                duration: 0.1,
                opacity: 1,
                x: 0,
                onComplete: () => {
                    verticalItemList.style.pointerEvents = "all";
                }
            })
        } else {
            menuButton.innerHTML = "DISCOVER";

            gsap.to(".location-div", {
                duration: 0.1,
                x: -20,
                opacity: 0,
                onComplete: () => {
                    verticalItemList.style.pointerEvents = "none";
                }
            })
        }
    })

    openButton.addEventListener('click', function () {
        openButton.style.opacity = '0';

        gsap.to(openPopup, {
            opacity: 1,
            duration: 1,
            ease: "power3.out",
            onComplete: () => {
                openPopup.style.transition = 'opacity 0.6s ease-in-out';
                openPopup.style.pointerEvents = "all";
            }
        })
    })

    accountButton.addEventListener('click', function () {

        if (menuButton.innerHTML == "CLOSE") {
            menuButton.click();
        }

        backgroundAnimation.style.filter = 'blur(15px)';
        menuButton.style.opacity = '0';
        menuButton.style.pointerEvents = 'none';
        brandName.style.opacity = '0';
        brandName.style.pointerEvents = 'none';
        accountButton.style.opacity = '0';
        accountButton.style.pointerEvents = 'none';
        header.style.backdropFilter = 'blur(0)';
        header.style.pointerEvents = 'none';

        setTimeout(function () {
            gsap.to(backgroundAnimation, {
                duration: 0.2,
                ease: Expo.easeInOut,
                scale: 3,
                onComplete: () => {
                    accountPage.style.opacity = '1';
                    accountPage.style.pointerEvents = 'all';
                    closeAccountButton.style.opacity = '1';
                    closeAccountButton.style.pointerEvents = 'all';
                }
            });
        }, 400);
    });

    closeAccountButton.addEventListener('click', function () {
        closeAccountButton.style.opacity = '0';
        closeAccountButton.style.pointerEvents = 'none';

        gsap.to(backgroundAnimation, {
            duration: 0.2,
            ease: Expo.easeInOut,
            scale: 1,
            onComplete: () => {
                backgroundAnimation.style.filter = 'blur(0)';
                menuButton.style.opacity = '1';
                menuButton.style.pointerEvents = 'all';
                brandName.style.opacity = '1';
                brandName.style.pointerEvents = 'all';
                accountButton.style.opacity = '1';
                accountButton.style.pointerEvents = 'all';
                header.style.backdropFilter = 'blur(10px)';
                header.style.pointerEvents = 'all';
                accountPage.style.opacity = '0';
                accountPage.style.pointerEvents = 'none';
            }
        })
    })

});