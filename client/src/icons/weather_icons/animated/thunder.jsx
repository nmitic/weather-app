export const Thunderstorm = (props) => {
  return (
    <svg
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      width="64"
      height="64"
      viewBox="0 0 64 64"
      {...props}
    >
      <defs>
        <filter id="blur" width="200%" height="200%">
          <feGaussianBlur in="SourceAlpha" stdDeviation="3" />
          <feOffset dx="0" dy="4" result="offsetblur" />
          <feComponentTransfer>
            <feFuncA type="linear" slope="0.05" />
          </feComponentTransfer>
          <feMerge>
            <feMergeNode />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <style type="text/css">{`
/*
** CLOUDS
*/
@keyframes am-weather-cloud-1 {
  0% {
    -webkit-transform: translate(-5px,0px);
       -moz-transform: translate(-5px,0px);
        -ms-transform: translate(-5px,0px);
            transform: translate(-5px,0px);
  }

  50% {
    -webkit-transform: translate(10px,0px);
       -moz-transform: translate(10px,0px);
        -ms-transform: translate(10px,0px);
            transform: translate(10px,0px);
  }

  100% {
    -webkit-transform: translate(-5px,0px);
       -moz-transform: translate(-5px,0px);
        -ms-transform: translate(-5px,0px);
            transform: translate(-5px,0px);
  }
}

.am-weather-cloud-1 {
  -webkit-animation-name: am-weather-cloud-1;
     -moz-animation-name: am-weather-cloud-1;
          animation-name: am-weather-cloud-1;
  -webkit-animation-duration: 7s;
     -moz-animation-duration: 7s;
          animation-duration: 7s;
  -webkit-animation-timing-function: linear;
     -moz-animation-timing-function: linear;
          animation-timing-function: linear;
  -webkit-animation-iteration-count: infinite;
     -moz-animation-iteration-count: infinite;
          animation-iteration-count: infinite;
}

@keyframes am-weather-cloud-2 {
  0% {
    -webkit-transform: translate(0px,0px);
       -moz-transform: translate(0px,0px);
        -ms-transform: translate(0px,0px);
            transform: translate(0px,0px);
  }

  50% {
    -webkit-transform: translate(2px,0px);
       -moz-transform: translate(2px,0px);
        -ms-transform: translate(2px,0px);
            transform: translate(2px,0px);
  }

  100% {
    -webkit-transform: translate(0px,0px);
       -moz-transform: translate(0px,0px);
        -ms-transform: translate(0px,0px);
            transform: translate(0px,0px);
  }
}

.am-weather-cloud-2 {
  -webkit-animation-name: am-weather-cloud-2;
     -moz-animation-name: am-weather-cloud-2;
          animation-name: am-weather-cloud-2;
  -webkit-animation-duration: 3s;
     -moz-animation-duration: 3s;
          animation-duration: 3s;
  -webkit-animation-timing-function: linear;
     -moz-animation-timing-function: linear;
          animation-timing-function: linear;
  -webkit-animation-iteration-count: infinite;
     -moz-animation-iteration-count: infinite;
          animation-iteration-count: infinite;
}

/*
** STROKE
*/
@keyframes am-weather-stroke {
  0% {
    -webkit-transform: translate(0.0px,0.0px);
       -moz-transform: translate(0.0px,0.0px);
        -ms-transform: translate(0.0px,0.0px);
            transform: translate(0.0px,0.0px);
  }

  2% {
    -webkit-transform: translate(0.3px,0.0px);
       -moz-transform: translate(0.3px,0.0px);
        -ms-transform: translate(0.3px,0.0px);
            transform: translate(0.3px,0.0px);
  }

  4% {
    -webkit-transform: translate(0.0px,0.0px);
       -moz-transform: translate(0.0px,0.0px);
        -ms-transform: translate(0.0px,0.0px);
            transform: translate(0.0px,0.0px);
  }

  6% {
    -webkit-transform: translate(0.5px,0.4px);
       -moz-transform: translate(0.5px,0.4px);
        -ms-transform: translate(0.5px,0.4px);
            transform: translate(0.5px,0.4px);
  }

  8% {
    -webkit-transform: translate(0.0px,0.0px);
       -moz-transform: translate(0.0px,0.0px);
        -ms-transform: translate(0.0px,0.0px);
            transform: translate(0.0px,0.0px);
  }

  10% {
    -webkit-transform: translate(0.3px,0.0px);
       -moz-transform: translate(0.3px,0.0px);
        -ms-transform: translate(0.3px,0.0px);
            transform: translate(0.3px,0.0px);
  }

  12% {
    -webkit-transform: translate(0.0px,0.0px);
       -moz-transform: translate(0.0px,0.0px);
        -ms-transform: translate(0.0px,0.0px);
            transform: translate(0.0px,0.0px);
  }

  14% {
    -webkit-transform: translate(0.3px,0.0px);
       -moz-transform: translate(0.3px,0.0px);
        -ms-transform: translate(0.3px,0.0px);
            transform: translate(0.3px,0.0px);
  }

  16% {
    -webkit-transform: translate(0.0px,0.0px);
       -moz-transform: translate(0.0px,0.0px);
        -ms-transform: translate(0.0px,0.0px);
            transform: translate(0.0px,0.0px);
  }

  18% {
    -webkit-transform: translate(0.3px,0.0px);
       -moz-transform: translate(0.3px,0.0px);
        -ms-transform: translate(0.3px,0.0px);
            transform: translate(0.3px,0.0px);
  }

  20% {
    -webkit-transform: translate(0.0px,0.0px);
       -moz-transform: translate(0.0px,0.0px);
        -ms-transform: translate(0.0px,0.0px);
            transform: translate(0.0px,0.0px);
  }

  22% {
    -webkit-transform: translate(1px,0.0px);
       -moz-transform: translate(1px,0.0px);
        -ms-transform: translate(1px,0.0px);
            transform: translate(1px,0.0px);
  }

  24% {
    -webkit-transform: translate(0.0px,0.0px);
       -moz-transform: translate(0.0px,0.0px);
        -ms-transform: translate(0.0px,0.0px);
            transform: translate(0.0px,0.0px);
  }

  26% {
    -webkit-transform: translate(-1px,0.0px);
       -moz-transform: translate(-1px,0.0px);
        -ms-transform: translate(-1px,0.0px);
            transform: translate(-1px,0.0px);

  }

  28% {
    -webkit-transform: translate(0.0px,0.0px);
       -moz-transform: translate(0.0px,0.0px);
        -ms-transform: translate(0.0px,0.0px);
            transform: translate(0.0px,0.0px);
  }

  40% {
    fill: orange;
    -webkit-transform: translate(0.0px,0.0px);
       -moz-transform: translate(0.0px,0.0px);
        -ms-transform: translate(0.0px,0.0px);
            transform: translate(0.0px,0.0px);
  }

  65% {
    fill: white;
    -webkit-transform: translate(-1px,5.0px);
       -moz-transform: translate(-1px,5.0px);
        -ms-transform: translate(-1px,5.0px);
            transform: translate(-1px,5.0px);
  }
  61% {
    fill: orange;
  }

  100% {
    -webkit-transform: translate(0.0px,0.0px);
       -moz-transform: translate(0.0px,0.0px);
        -ms-transform: translate(0.0px,0.0px);
            transform: translate(0.0px,0.0px);
  }
}

.am-weather-stroke {
  -webkit-animation-name: am-weather-stroke;
     -moz-animation-name: am-weather-stroke;
          animation-name: am-weather-stroke;
  -webkit-animation-duration: 1.11s;
     -moz-animation-duration: 1.11s;
          animation-duration: 1.11s;
  -webkit-animation-timing-function: linear;
     -moz-animation-timing-function: linear;
          animation-timing-function: linear;
  -webkit-animation-iteration-count: infinite;
     -moz-animation-iteration-count: infinite;
          animation-iteration-count: infinite;
}
        `}</style>
      </defs>
      <g filter="url(#blur)" id="thunder">
        <g transform="translate(20,10)">
          <g className="am-weather-cloud-1">
            <path
              d="M47.7,35.4     c0-4.6-3.7-8.2-8.2-8.2c-1,0-1.9,0.2-2.8,0.5c-0.3-3.4-3.1-6.2-6.6-6.2c-3.7,0-6.7,3-6.7,6.7c0,0.8,0.2,1.6,0.4,2.3     c-0.3-0.1-0.7-0.1-1-0.1c-3.7,0-6.7,3-6.7,6.7c0,3.6,2.9,6.6,6.5,6.7l17.2,0C44.2,43.3,47.7,39.8,47.7,35.4z"
              fill="#91C0F8"
              stroke="white"
              strokeLinejoin="round"
              strokeWidth="1.2"
              transform="translate(-10,-6), scale(0.6)"
            />
          </g>
          <g>
            <path
              d="M47.7,35.4     c0-4.6-3.7-8.2-8.2-8.2c-1,0-1.9,0.2-2.8,0.5c-0.3-3.4-3.1-6.2-6.6-6.2c-3.7,0-6.7,3-6.7,6.7c0,0.8,0.2,1.6,0.4,2.3     c-0.3-0.1-0.7-0.1-1-0.1c-3.7,0-6.7,3-6.7,6.7c0,3.6,2.9,6.6,6.5,6.7l17.2,0C44.2,43.3,47.7,39.8,47.7,35.4z"
              fill="#57A0EE"
              stroke="white"
              strokeLinejoin="round"
              strokeWidth="1.2"
              transform="translate(-20,-11)"
            />
          </g>
          <g transform="translate(-9,28), scale(1.2)">
            <polygon
              className="am-weather-stroke"
              fill="orange"
              stroke="white"
              strokeWidth="1"
              points="14.3,-2.9 20.5,-2.9 16.4,4.3 20.3,4.3 11.5,14.6 14.9,6.9 11.1,6.9"
            />
          </g>
        </g>
      </g>
    </svg>
  );
};
