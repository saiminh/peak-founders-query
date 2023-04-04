let homeSlideShowIsPlaying = false;

document.addEventListener('DOMContentLoaded', () => {
  if ( document.querySelector('.peak-founders-query-loop') ) {
    loadFounders();
    initFilter();
    setTimeout(() => {
      window.location.hash && openfounder(document.getElementById(window.location.hash.replace('#', '')));
    }, 500)
  }

  if ( document.querySelector('.peak-founders-query-loop-home') ) {
    initHomeFounders();
    initSlideShow();
    observer.observe(document.querySelector('.peak-founders-query-loop-home'));
  }

});

const initHomeFounders = function() {
    const homeloop = document.querySelector('.peak-founders-query-loop-home');
    const homeFounders = homeloop.querySelectorAll('.founders');
    homeFounders.forEach((homeFounder, index) => {
      const postID = Array.from(homeFounder.classList).filter(className => className.startsWith('post-') )[0];
      if ( postID ) {
        let homeFounderLink = document.createElement('a');
        homeFounderLink.classList.add('home-founder-link');
        homeFounderLink.setAttribute('href', `/founders/#`+postID);
        homeFounderLink.innerHTML = 'Read More';
        homeFounder.appendChild(homeFounderLink);
      }
    });
}

let callback = (entries, observer) => {
  entries.forEach((entry) => {
    entry.isIntersecting ? homeSlideShowIsPlaying = true : homeSlideShowIsPlaying = false;
  });
};

let observer = new IntersectionObserver( callback , {
  rootMargin: '0px',
  threshold: 1
})



const initSlideShow = function() {

  let dotsContainer = document.createElement('div');
  dotsContainer.classList.add('dots-container');

  document.querySelectorAll(".founders").forEach((founder, index) => {
    let dot = document.createElement('span');
    dot.classList.add('dot');
    dot.addEventListener('click', (e) => { 
      currentSlide(index + 1);
      clearInterval( theInterval );
      theInterval = setInterval(() => {
        slideIndex++;
        showSlides(slideIndex);
      }, 3000);
    });
    dotsContainer.appendChild(dot);
  })

  document.querySelector('.peak-founders-query-loop-home').appendChild(dotsContainer);

  let slideIndex = 1;
  showSlides(slideIndex);

  // Next/previous controls
  function plusSlides(n) {
    showSlides(slideIndex += n);
  }

  // Thumbnail image controls
  function currentSlide(n) {
    showSlides(slideIndex = n);
  }
  
  let theInterval = setInterval(() => {
    if (homeSlideShowIsPlaying) {
      slideIndex++;
      showSlides(slideIndex);
    }
  }, 3000);

  document.querySelectorAll('.home-founder-link').forEach((link) => {
    link.addEventListener('click', (e) => {
      clearInterval( theInterval );
    });
  });
  
  function showSlides(n) {
    const scroller = document.querySelector('.peak-founders-query-loop-home .wp-block-post-template');
    let i;
    let slides = document.querySelectorAll(".founders");
    let dots = document.querySelectorAll(".dot");
    if (n > slides.length) { slideIndex = 1 }
    if (n < 1) { slideIndex = slides.length }
    scroller.style.transition = 'transform 0.5s ease-in-out';
    if (slideIndex == 1) {
      scroller.style.transform = 'translateX(0px)';
    } else {
      scroller.style.transform = 'translateX(-'+ scroller.querySelector('.founders').getBoundingClientRect().width * (n - 1) +'px)';
    }
    for ( i = 0; i < slides.length; i++ ) {
      dots[i].className = dots[i].className.replace(" active", "");
    }
    // slides[slideIndex - 1].style.display = 'block';
    dots[slideIndex - 1].className += " active";
    
  }
}

const loadFounders = function() {
  let founders = document.querySelectorAll('.founders');  

  founders.forEach((founder, index) => {

    const postID = Array.from(founder.classList).filter(className => className.startsWith('post-') )[0];
    founder.setAttribute('id', postID);
    
    //fade in after load
    if (index > 6) {
      setTimeout(() => {
        founder.classList.add('loaded');
      }, index * 100);
    } else {
      setTimeout(() => {
        founder.classList.add('loaded');
      }, 100);
    }
    
    //create a toggle element
    const toggle = document.createElement('div');
    toggle.classList.add('founder-toggle');
    founder.querySelector('.founder-coin').parentElement.appendChild(toggle);
    
    //listen to toggle element click
    founder.addEventListener('click', (e) => {
      e.preventDefault();
      openfounder(founders[index]);
    });

  });
}

const initFilter = function() {
  const filterdiv = document.createElement('div');
  filterdiv.classList.add('content-filter');
  filterdiv.innerHTML = `
    <a href="#" class="filter-link" data-filter="businessmodel-saas">Saas</a>
    <a href="#" class="filter-link" data-filter="businessmodel-platform-marketplace">Platforms & Marketplaces</a>
    <a href="#" class="filter-link" data-filter="has-exited">Exits</a>
  `;
  document.querySelector('.peak-founders-query-loop').prepend(filterdiv);
  
  document.querySelectorAll('.filter-link').forEach((filterLink) => {
    const filterTarget = filterLink.getAttribute('data-filter');
    
    filterLink.addEventListener('click', (e) => {
      e.preventDefault();
      
      if (filterLink.classList.contains('active')) {
        filterLink.classList.remove('active');
        document.querySelectorAll('.founders').forEach((founder, index) => {
          
          founder.style.transition = "all .3s cubic-bezier(0.165, 0.84, 0.44, 1)";

          setTimeout(() => {
            founder.style.transform = 'translateY(50%)';
            founder.style.opacity = 0;
          }, 50 );

          setTimeout(() => {
            founder.style.display = 'block';
            founder.style.transition = "all .5s cubic-bezier(0.165, 0.84, 0.44, 1)";
          }, 300 );

          setTimeout(() => {
              founder.style.transform = 'translateY(0px)';
              founder.style.opacity = 1;
          }, 301 + (index + 1) * 100 );

        });
      }
      else {
        document.querySelector('.filter-link.active') && document.querySelector('.filter-link.active').classList.remove('active');
        filterLink.classList.add('active');
       
        let filteredArray = [];
       
        document.querySelectorAll('.founders').forEach((founder, index) => {
          let filteredIndex = 0;
          let isfiltered = false;
          
          if ( founder.classList.contains(filterTarget) ) {
            filteredArray.push(founder);
            filteredIndex = filteredArray.length - 1;
            isfiltered = true;
          }

          founder.style.transition = "all .3s cubic-bezier(0.165, 0.84, 0.44, 1)";

          setTimeout(() => {
            isfiltered ? founder.style.transform = 'translateY(30%)' : founder.style.transform = 'translateY(50%)';
            founder.style.opacity = 0;
          }, 50 );

          setTimeout(() => {
            founder.style.display = 'block';
            if ( !founder.classList.contains(filterTarget) ) {
              founder.style.display = 'none';
            }
            founder.style.transition = "all .5s cubic-bezier(0.165, 0.84, 0.44, 1)";
          }, 300 );

          setTimeout(() => {
              founder.style.transform = 'translateY(0px)';
              founder.style.opacity = 1;
          }, 301 + (filteredIndex + 1) * 100 );
        });
        
      } 

      
    });
  });
}

const openfounder = function(founder) {

  //filter out the founders that are not visible
  let filteredFounders = [];
  document.querySelectorAll('.founders').forEach((founder) => {
    if ( founder.style.display != 'none' ) {
      filteredFounders.push(founder);
    }
  });
  // clone the founder element
  let founderClone = founder.cloneNode(true);
  founder.parentNode.appendChild(founderClone);
  founderClone.classList.add('founder-full-popup');
  founderClone.querySelector('.founder-toggle').remove();
  //create a toggle element
  const fulltoggle = document.createElement('div');
  fulltoggle.classList.add('founder-toggle');
  founderClone.querySelector('.founder-coin').parentElement.appendChild(fulltoggle);
  //listen to toggle element click
  fulltoggle.addEventListener('click', (e) => {
    closefounder(founderClone);
  });

  const prevnext = document.createElement('div');
  prevnext.classList.add('founder-prevnext');
  founderClone.appendChild(prevnext);

  if ( filteredFounders[0] != founder ) {
    //create a prev element
    const prev = document.createElement('div');
    prev.classList.add('founder-prev');
    prevnext.appendChild(prev);

    //listen to prev click 
    prev.addEventListener('click', (e) => {
      e.preventDefault();
      closefounder(founderClone);
      openfounder(filteredFounders[filteredFounders.indexOf(founder) - 1]);
    });
  }
  
  if (
    false == founder.nextElementSibling.classList.contains('founder-full-popup')
    && filteredFounders.indexOf(founder) != filteredFounders.length - 1
  ) {
    //create a next element
    const next = document.createElement('div');
    next.classList.add('founder-next');
    prevnext.appendChild(next);

    //listen to next click 
    next.addEventListener('click', (e) => {
      e.preventDefault();
      closefounder(founderClone);
      openfounder(filteredFounders[filteredFounders.indexOf(founder) + 1]);
    });
  }; 
  
}

const closefounder = function(element) {
  element.classList.add('reverse');
  setTimeout(() => {
    element.remove();
  }, 600);
};