
document.addEventListener("DOMContentLoaded", (event) => {

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
    const featuredOfTheMonth = document.querySelector('.featured-of-the-month');
    const featuredControls = document.querySelector('.featured-controls');
    const featuredControlsText = document.getElementById('featuredControlsText');
    const monthDisplayed = document.getElementById('monthDisplayed');
    const featuredLocations = document.querySelectorAll('.featured-location');
    const featuredLocationInfos = document.querySelectorAll('.featured-location-info');
    const locationDetailsWrapper = document.querySelector('.location-details-wrapper');
    const mainLocationInfo = document.querySelector('.main-location-info');
    const locationDetailImageContainer = document.querySelector('.location-detail-image-container');
    const form = document.getElementById('createAccountForm');
    const formData = new FormData(form);
    const inputs = document.querySelectorAll('.createAccountInput');
    const firstNameInput = document.getElementById('firstName');
    const lastNameInput = document.getElementById('lastName');
    const usernameInput = document.getElementById('username');
    const inputUsernameContainer = document.getElementById('input-container-username');
    const emailInput = document.getElementById('email');
    const inputEmailContainer = document.getElementById('input-container-email');
    const passwordInput = document.getElementById('password');
    const inputPasswordContainer = document.getElementById('input-container-password');
    const inputFirstContainer = document.getElementById('input-container-first-name');
    const inputLastContainer = document.getElementById('input-container-last-name');
    const formInputs = document.querySelectorAll('.create-account-form input, .login-account-form input');
    const firstNameError = document.createElement('p');
    const lastNameError = document.createElement('p');
    const usernameError = document.createElement('p');
    const emailError = document.createElement('p');
    const passwordError = document.createElement('p');


    function resetFormInputs() {
        firstNameInput.value = '';
        lastNameInput.value = '';
        usernameInput.value = '';
        emailInput.value = '';
        passwordInput.value = '';
    }

    function resetFormErrors() {
        firstNameError.innerText = '';
        lastNameError.innerText = '';
        usernameError.innerText = '';
        emailError.innerText = '';
        passwordError.innerText= '';
    }

    openButton.addEventListener('click', function () {
        openButton.style.opacity = '0';

        resetFormInputs();

        gsap.to(openPopup, {
            opacity: 1,
            duration: 0.2,
            ease: "power3.out",
            onComplete: () => {
                openPopup.style.transition = 'opacity 0.6s ease-in-out';
            }
        })
        openPopup.style.pointerEvents = "all";
    })

    formInputs.forEach(input => {
        input.addEventListener('focus', () => {
            input.classList.add('inputNew');
        });
    });

    document.getElementById('submitBtn').addEventListener('click', function() {

        resetFormErrors();

        fetch('/api/members/createAccount', {
            method: 'POST',
            body: formData
        })
            .then(response => response.json())
            .then(data => {
                inputs.forEach(input => {
                    input.style.outline = '';
                    input.style.color = '';
                });

                if (data.status === "success") {
                    inputs.forEach(input => {
                        input.style.outline = '1px solid #A2CA71';
                        input.style.color = '#A2CA71';

                        setTimeout(() => {
                            registerAnimationTL = gsap.timeline();

                            registerAnimationTL.to(lastNameInput, {y: 25, duration: 0.5, ease: 'power3.InOut'});
                            registerAnimationTL.to(firstNameInput, {y: 50, duration: 0.5, ease: 'power3.InOut'}, '-=75%');
                        }, 500)

                    });
                } else {
                    if (data.firstNameError) {
                        firstNameInput.classList.remove('inputDefault');
                        firstNameInput.classList.add('inputError');
                        firstNameError.textContent = data.firstNameError;
                        inputFirstContainer.appendChild(firstNameError);

                    }else {
                        firstNameInput.classList.add('inputValid');
                    }

                    if (data.lastNameError) {
                        lastNameInput.style.outline = '1px solid #a34646';
                        lastNameInput.style.color = '#a34646';
                        lastNameError.textContent = data.lastNameError;
                        inputLastContainer.appendChild(lastNameError);

                    }else {
                        lastNameInput.style.outline = '1px solid #A2CA71';
                        lastNameInput.style.color = '#A2CA71';
                    }

                    if (data.usernameError) {
                        usernameInput.style.outline = '1px solid #a34646';
                        usernameInput.style.color = '#a34646';
                        usernameError.textContent = data.usernameError;
                        inputUsernameContainer.appendChild(usernameError);
                    }else {
                        usernameInput.style.outline = '1px solid #A2CA71';
                        usernameInput.style.color = '#A2CA71';
                    }

                    if (data.emailError) {
                        emailInput.style.outline = '1px solid #a34646';
                        emailInput.style.color = '#a34646';
                        emailError.textContent = data.emailError;
                        inputEmailContainer.appendChild(emailError);
                    }else {
                        emailInput.style.outline = '1px solid #A2CA71';
                        emailInput.style.color = '#A2CA71';
                    }

                    if (data.passwordError) {
                        passwordInput.style.outline = '1px solid #a34646';
                        passwordInput.style.color = '#a34646';
                        passwordError.textContent = data.passwordError;
                        inputPasswordContainer.appendChild(passwordError);
                    }else {
                        passwordInput.style.outline = '1px solid #A2CA71';
                        passwordInput.style.color = '#A2CA71';
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
                featuredOfTheMonth.style.opacity = '1';
                featuredOfTheMonth.style.pointerEvents = 'all';
                gsap.to(".location-div", {
                    duration: 0.1,
                    opacity: 1,
                    x: 0,
                    onComplete: () => {
                        verticalItemList.style.pointerEvents = "all";
                    }
                })
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

    featuredControls.addEventListener('click', function() {
        if(featuredControlsText.textContent === "Open featured"){
            gsap.to(featuredOfTheMonth, {
                duration: 0.8,
                y: 0,
                ease: 'power2.inOut'
            })
            featuredControlsText.textContent = "Close featured";

            gsap.to(".location-div", {
                duration: 0.1,
                x: -20,
                opacity: 0,
                onComplete: () => {
                    verticalItemList.style.pointerEvents = "none";
                }
            })

        }else {
            gsap.to(featuredOfTheMonth, {
                duration: 0.8,
                y: '70vh',
                ease: 'power2.inOut'
            })
            gsap.to(".location-div", {
                duration: 0.1,
                opacity: 1,
                x: 0,
                onComplete: () => {
                    verticalItemList.style.pointerEvents = "all";
                }
            })
            featuredControlsText.textContent = "Open featured";
        }
    })

    function getMonthAndYear() {
        const date = new Date();
        const options = { month: 'long', year: 'numeric' };
        const formattedDate = date.toLocaleString('en-US', options);

        return formattedDate.toUpperCase();
    }
    monthDisplayed.textContent = getMonthAndYear();

    featuredLocations.forEach((location, index) => {
        const info = featuredLocationInfos[index];

        location.addEventListener('mouseover', function() {
            gsap.to(info, {
                duration: 0.2,
                y: '40px',
                ease: 'power2.inOut',
                opacity: 1
            });
        });

        location.addEventListener('mouseout', function() {
            gsap.to(info, {
                duration: 0.2,
                y: 0,
                ease: 'power2.inOut',
                opacity: 0
            });
        });
    });

    function handleMenuItems() {
        const menuItems = document.querySelectorAll('.location-div');
        const locationItemLike = document.querySelectorAll('.location-div-extra');

        let currentLocationDisplayed = null;

        gsap.set(".location-div", { x: -20 });

        menuItems.forEach((location, index) => {
            const h2 = location.querySelector('.menu-item');
            const upvotes = location.querySelector('.location-div-extra');
            const locationImgSrc = "./assets/" + h2.dataset.imagePath;

            location.addEventListener('mouseover', function () {
                const imgSrc = locationImgSrc
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

            const imgElement = locationDetailsWrapper.querySelector('.location-detail-image-container img');
            const pElement = locationDetailsWrapper.querySelector('.main-location-info p');

            location.addEventListener('click', function(event) {
                event.stopPropagation();

                if (locationItemLike[index].contains(event.target)) {
                    return;
                }

                const locationSpecified = h2.textContent;

                if (currentLocationDisplayed !== null) {

                    if (currentLocationDisplayed !== locationSpecified) {

                        gsap.to(locationDetailsWrapper, {
                            duration: 0.4,
                            x: -100,
                            opacity: 0,
                            ease: 'power2.inOut',
                            onComplete: () => {
                                imgElement.src = locationImgSrc;
                                pElement.textContent = h2.textContent;

                                gsap.to(locationDetailsWrapper, {
                                    duration: 0.6,
                                    x: 0,
                                    opacity: 1,
                                    ease: 'power2.inOut'
                                });
                            }
                        });

                        currentLocationDisplayed = locationSpecified;

                    } else {

                        gsap.to(locationDetailsWrapper, {
                            duration: 0.6,
                            x: -100,
                            opacity: 0,
                            ease: 'power2.inOut',
                            onComplete: () => {
                                imgElement.src = "";
                                pElement.textContent = "";
                            }
                        });

                        locationDetailsWrapper.style.pointerEvents = 'none';
                        currentLocationDisplayed = null;

                    }
                } else {

                    imgElement.src = locationImgSrc;
                    pElement.textContent = h2.textContent;

                    gsap.to(locationDetailsWrapper, {
                        duration: 0.6,
                        x: 0,
                        opacity: 1,
                        ease: 'power2.inOut'
                    });

                    locationDetailsWrapper.style.pointerEvents = 'all';
                    currentLocationDisplayed = locationSpecified;

                }

            });

            document.addEventListener('click', function(event) {

                if (!location.contains(event.target) && !locationDetailsWrapper.contains(event.target)) {

                    if (currentLocationDisplayed !== null) {

                        gsap.to(locationDetailsWrapper, {
                            duration: 0.6,
                            x: -100,
                            opacity: 0,
                            ease: 'power2.inOut',
                            pointerEvents: 'none',
                            onComplete: () => {
                                imgElement.src = "";
                                pElement.textContent = "";
                            }
                        });

                        currentLocationDisplayed = null;

                    }
                }
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

    accountButton.addEventListener('click', function () {

        if(featuredControlsText.textContent === "Close featured"){
            featuredControls.click();
        }

        featuredControls.style.opacity = '0';
        featuredControls.style.pointerEvents = 'none';

        gsap.to(".location-div", {
            duration: 0.1,
            x: -20,
            opacity: 0,
            onComplete: () => {
                verticalItemList.style.pointerEvents = "none";
            }
        })

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
                featuredControls.style.opacity = '1';
                featuredControls.style.pointerEvents = 'all';
                gsap.to(".location-div", {
                    duration: 0.1,
                    opacity: 1,
                    x: 0,
                    onComplete: () => {
                        verticalItemList.style.pointerEvents = "all";
                    }
                })
            }
        })
    })

});