import * as React from "react";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useGSAPAnimations } from "@/lib/hooks/use-gsap-animations";

const Frame = (props: React.SVGProps<SVGSVGElement>) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const mainGroupRef = useRef<SVGGElement>(null);
  const pathsGroupRef = useRef<SVGGElement>(null);

  const anim = useGSAPAnimations(svgRef);

  useGSAP(() => {
    const tl = anim.createTimeline();

    // Entrance animations - main group fades in
    tl.to(mainGroupRef.current, {
      opacity: 0.6,
      duration: 1.5,
      ease: "power2.out",
    });

    // Staggered paths fade-in
    if (pathsGroupRef.current) {
      const paths = pathsGroupRef.current.querySelectorAll("path");
      anim.staggerFadeIn(paths, {
        duration: 1.2,
        stagger: 0.03,
        delay: 0.3,
        from: { opacity: 0, scale: 0.95 },
        to: { opacity: 1, scale: 1 },
      });
    }

    // Continuous floating animation - smooth, organic floating effect with multiple layers
    const floatDelay = 1.5;
    
    // Set transform origin for smooth rotations
    gsap.set(mainGroupRef.current, { transformOrigin: "50% 50%" });
    
    // Create a complex floating timeline with figure-8 pattern
    const floatTimeline = gsap.timeline({ 
      repeat: -1, 
      delay: floatDelay,
      ease: "sine.inOut"
    });
    
    // Figure-8 floating pattern - creates a smooth, organic movement
    floatTimeline
      .to(mainGroupRef.current, {
        y: -25,
        x: 20,
        duration: 3,
        ease: "sine.inOut",
      })
      .to(mainGroupRef.current, {
        y: -15,
        x: -15,
        duration: 3,
        ease: "sine.inOut",
      })
      .to(mainGroupRef.current, {
        y: -20,
        x: -20,
        duration: 3,
        ease: "sine.inOut",
      })
      .to(mainGroupRef.current, {
        y: -10,
        x: 15,
        duration: 3,
        ease: "sine.inOut",
      })
      .to(mainGroupRef.current, {
        y: 0,
        x: 0,
        duration: 2,
        ease: "sine.inOut",
      });
    
    // Gentle rotation - more noticeable but still subtle
    gsap.to(mainGroupRef.current, {
      rotation: 3,
      duration: 7,
      ease: "sine.inOut",
      repeat: -1,
      yoyo: true,
      delay: floatDelay,
    });
    
    // Breathing scale effect - makes it feel alive
    gsap.to(mainGroupRef.current, {
      scale: 1.04,
      duration: 5,
      ease: "sine.inOut",
      repeat: -1,
      yoyo: true,
      delay: floatDelay,
    });

    // Continuous looping animations for gradient paths
    if (pathsGroupRef.current) {
      const gradientPaths = pathsGroupRef.current.querySelectorAll("path");
      anim.animateGradientPaths(gradientPaths, {
        count: 33,
        opacityRange: [0.5, 0.8],
        durationRange: [2, 4],
        stagger: 0.1,
      });
    }
  }, { scope: svgRef });

  return (
    <svg
      ref={svgRef}
      width={808}
      height={1117}
      viewBox="0 0 808 1117"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g clipPath="url(#clip0_204_154694)" filter="url(#filter0_d_204_154694)">
        <g ref={mainGroupRef} className="gsap-fade-in" opacity={0} filter="url(#filter1_f_204_154694)">
          <g ref={pathsGroupRef}>
        <path
          style={{
            mixBlendMode: "screen",
          }}
          d="M666.896 858.99C644.136 886.857 574.803 628.997 512.039 283.049C449.272 -62.9014 416.841 -365.939 439.601 -393.805C462.362 -421.672 531.694 -163.815 594.459 182.136C657.225 528.084 689.657 831.124 666.896 858.99Z"
          fill="url(#paint0_radial_204_154694)"
        />
        <path
          style={{
            mixBlendMode: "screen",
          }}
          d="M184.335 870.108C208.025 896.868 268.533 635.918 319.486 287.261C370.438 -61.3964 392.541 -365.734 368.852 -392.493C345.162 -419.255 284.652 -158.303 233.699 190.354C182.746 539.011 160.646 843.349 184.335 870.108Z"
          fill="url(#paint1_radial_204_154694)"
        />
        <path
          style={{
            mixBlendMode: "screen",
          }}
          d="M734.133 716.172C723.632 735.748 649.697 504.531 568.994 199.734C488.29 -105.063 431.378 -368.018 441.876 -387.597C452.375 -407.173 526.309 -175.957 607.015 128.84C687.719 433.638 744.631 696.593 734.133 716.172Z"
          fill="url(#paint2_radial_204_154694)"
        />
        <path
          style={{
            mixBlendMode: "screen",
          }}
          d="M83.6483 723.289C94.432 742.649 164.981 509.957 241.227 203.556C317.474 -102.844 370.542 -366.924 359.758 -386.285C348.974 -405.645 278.425 -172.953 202.18 133.449C125.932 439.848 72.8646 703.928 83.6483 723.289Z"
          fill="url(#paint3_radial_204_154694)"
        />
        <path
          style={{
            mixBlendMode: "screen",
          }}
          d="M307.011 975.679C294.665 970.637 303.19 660.277 326.054 282.468C348.918 -95.3405 377.462 -397.527 389.808 -392.485C402.155 -387.442 393.63 -77.0793 370.766 300.727C347.902 678.535 319.358 980.722 307.011 975.679Z"
          fill="url(#paint4_radial_204_154694)"
        />
        <path
          style={{
            mixBlendMode: "screen",
          }}
          d="M504.582 972.357C516.929 967.314 508.401 656.954 485.539 279.146C462.675 -98.6628 434.131 -400.85 421.785 -395.807C409.438 -390.764 417.963 -80.4016 440.827 297.404C463.689 675.213 492.232 977.4 504.582 972.357Z"
          fill="url(#paint5_radial_204_154694)"
        />
        <path
          style={{
            mixBlendMode: "screen",
          }}
          d="M404.593 990.421C391.984 986.392 382.528 676.067 383.473 297.294C384.419 -81.4795 395.405 -385.271 408.016 -381.242C420.625 -377.212 430.081 -66.8874 429.136 311.886C428.193 690.662 417.204 994.451 404.593 990.421Z"
          fill="url(#paint6_radial_204_154694)"
        />
        <path
          style={{
            mixBlendMode: "screen",
          }}
          d="M508.915 307.295C499.716 322.839 471.688 179.01 446.316 -13.9556C420.946 -206.921 407.835 -375.951 417.034 -391.492C426.236 -407.037 454.263 -263.208 479.634 -70.242C505.006 122.724 518.117 291.753 508.915 307.295Z"
          fill="url(#paint7_radial_204_154694)"
        />
        <path
          style={{
            mixBlendMode: "screen",
          }}
          d="M310.777 311.667C320.353 326.592 344.814 181.039 365.41 -13.4372C386.008 -207.913 394.941 -377.667 385.367 -392.594C375.79 -407.519 351.33 -261.966 330.734 -67.4893C310.135 126.987 301.202 296.74 310.777 311.667Z"
          fill="url(#paint8_radial_204_154694)"
        />
        <path
          style={{
            mixBlendMode: "screen",
          }}
          d="M545.213 227.634C540.969 238.555 511.082 109.587 478.457 -60.4252C445.835 -230.435 422.827 -377.11 427.073 -388.028C431.317 -398.949 461.204 -269.981 493.827 -99.969C526.451 70.0406 549.457 216.714 545.213 227.634Z"
          fill="url(#paint9_radial_204_154694)"
        />
        <path
          style={{
            mixBlendMode: "screen",
          }}
          d="M676.581 207.958C674.709 219.429 618.525 96.9894 551.088 -65.5198C483.653 -228.026 430.503 -369.065 432.375 -380.537C434.247 -392.008 490.431 -269.568 557.866 -107.059C625.303 55.4474 678.453 196.486 676.581 207.958Z"
          fill="url(#paint10_radial_204_154694)"
        />
        <path
          style={{
            mixBlendMode: "screen",
          }}
          d="M173.691 201.09C164.475 208.746 203.074 81.8904 259.904 -82.2514C316.734 -246.391 370.278 -385.66 379.494 -393.317C388.712 -400.973 350.113 -274.115 293.281 -109.976C236.45 54.1661 182.909 193.435 173.691 201.09Z"
          fill="url(#paint11_radial_204_154694)"
        />
        <path
          style={{
            mixBlendMode: "screen",
          }}
          d="M269.162 230.856C273.521 241.655 302.041 111.862 332.862 -59.0438C363.684 -229.947 385.135 -377.247 380.776 -388.046C376.417 -398.845 347.897 -269.054 317.076 -98.1483C286.255 72.7577 264.803 220.058 269.162 230.856Z"
          fill="url(#paint12_radial_204_154694)"
        />
        <path
          style={{
            mixBlendMode: "screen",
          }}
          d="M363.439 372.384C358.448 369.571 361.892 196.456 371.136 -14.2783C380.378 -225.015 391.916 -393.57 396.907 -390.756C401.898 -387.943 398.452 -214.831 389.21 -4.09399C379.968 206.64 368.43 375.197 363.439 372.384Z"
          fill="url(#paint13_radial_204_154694)"
        />
        <path
          style={{
            mixBlendMode: "screen",
          }}
          d="M443.302 370.53C448.294 367.72 444.847 194.605 435.605 -16.1319C426.363 -226.866 414.825 -395.421 409.834 -392.61C404.843 -389.797 408.287 -216.682 417.531 -5.94757C426.773 204.789 438.311 373.344 443.302 370.53Z"
          fill="url(#paint14_radial_204_154694)"
        />
        <path
          style={{
            mixBlendMode: "screen",
          }}
          d="M402.884 380.607C397.786 378.36 393.965 205.265 394.347 -6.01004C394.729 -217.282 399.17 -386.731 404.267 -384.484C409.365 -382.237 413.186 -209.142 412.804 2.13037C412.422 213.405 407.981 382.854 402.884 380.607Z"
          fill="url(#paint15_radial_204_154694)"
        />
        <path
          style={{
            mixBlendMode: "screen",
          }}
          d="M708.105 376.053C669.122 389.256 573.023 227.483 493.461 14.7231C413.901 -198.04 381.005 -381.222 419.991 -394.425C458.974 -407.631 555.072 -245.858 634.635 -33.0955C714.195 179.667 747.091 362.847 708.105 376.053Z"
          fill="url(#paint16_radial_204_154694)"
        />
        <path
          style={{
            mixBlendMode: "screen",
          }}
          d="M122.101 383.261C82.6466 371.386 108.665 187.206 180.214 -28.1165C251.763 -243.441 341.748 -408.368 381.203 -396.495C420.655 -384.619 394.637 -200.439 323.088 14.8855C251.539 230.208 161.554 395.137 122.101 383.261Z"
          fill="url(#paint17_radial_204_154694)"
        />
        <path
          style={{
            mixBlendMode: "screen",
          }}
          d="M404.001 695.662C362.62 695.662 329.076 453.857 329.076 155.578C329.076 -142.701 362.62 -384.506 404.001 -384.506C445.38 -384.506 478.924 -142.701 478.924 155.578C478.924 453.857 445.38 695.662 404.001 695.662Z"
          fill="url(#paint18_radial_204_154694)"
        />
        <path
          style={{
            mixBlendMode: "screen",
          }}
          d="M486.509 363.507C479.86 377.315 459.344 219.541 440.684 11.1096C422.021 -197.324 412.281 -377.488 418.93 -391.295C425.578 -405.105 446.094 -247.331 464.755 -38.8977C483.415 169.533 493.155 349.697 486.509 363.507Z"
          fill="url(#paint19_radial_204_154694)"
        />
        <path
          style={{
            mixBlendMode: "screen",
          }}
          d="M342.89 315.562C349.852 333.701 367.378 188.036 382.038 -9.7919C396.695 -207.62 402.933 -382.697 395.971 -400.839C389.009 -418.978 371.483 -273.314 356.823 -75.4857C342.166 122.342 335.928 297.42 342.89 315.562Z"
          fill="url(#paint20_radial_204_154694)"
        />
        <path
          style={{
            mixBlendMode: "screen",
          }}
          d="M512.706 289.856C509.646 300.144 487.8 157.412 463.915 -28.9497C440.03 -215.309 423.15 -374.725 426.21 -385.016C429.27 -395.304 451.116 -252.572 475.001 -66.2133C498.886 120.148 515.769 279.565 512.706 289.856Z"
          fill="url(#paint21_radial_204_154694)"
        />
        <path
          style={{
            mixBlendMode: "screen",
          }}
          d="M649.436 275.479C649.002 287.468 598.802 149.415 537.31 -32.8732C475.817 -215.159 426.318 -372.654 426.75 -384.643C427.184 -396.635 477.384 -258.583 538.878 -76.2941C600.369 105.992 649.87 263.486 649.436 275.479Z"
          fill="url(#paint22_radial_204_154694)"
        />
        <path
          style={{
            mixBlendMode: "screen",
          }}
          d="M229.283 163.643C221.956 169.204 252.503 46.8298 297.513 -109.687C342.524 -266.202 384.954 -397.592 392.284 -403.15C399.611 -408.71 369.064 -286.337 324.055 -129.822C279.043 26.6948 236.613 158.082 229.283 163.643Z"
          fill="url(#paint23_radial_204_154694)"
        />
        <path
          style={{
            mixBlendMode: "screen",
          }}
          d="M312.611 220.059C315.784 232.504 336.277 104.389 358.379 -66.0905C380.482 -236.57 395.825 -384.86 392.652 -397.302C389.476 -409.746 368.986 -281.631 346.884 -111.152C324.781 59.3277 309.435 207.615 312.611 220.059Z"
          fill="url(#paint24_radial_204_154694)"
        />
        <path
          style={{
            mixBlendMode: "screen",
          }}
          d="M381.146 392.986C377.523 388.722 379.779 208.678 386.185 -9.15497C392.59 -226.988 400.719 -400.124 404.34 -395.86C407.962 -391.597 405.706 -211.553 399.3 6.28268C392.897 224.116 384.768 397.249 381.146 392.986Z"
          fill="url(#paint25_radial_204_154694)"
        />
        <path
          style={{
            mixBlendMode: "screen",
          }}
          d="M439.036 412.217C442.647 410.599 439.908 228.727 432.915 5.99576C425.92 -216.738 417.322 -395.987 413.708 -394.37C410.093 -392.753 412.833 -210.883 419.828 11.8509C426.821 234.585 435.421 413.834 439.036 412.217Z"
          fill="url(#paint26_radial_204_154694)"
        />
        <path
          style={{
            mixBlendMode: "screen",
          }}
          d="M409.751 412.038C406.052 408.336 403.039 226.388 403.02 5.64191C403.004 -215.104 405.986 -391.052 409.685 -387.353C413.382 -383.651 416.395 -201.702 416.414 19.0432C416.431 239.789 413.448 415.737 409.751 412.038Z"
          fill="url(#paint27_radial_204_154694)"
        />
        <path
          style={{
            mixBlendMode: "screen",
          }}
          d="M630.99 488.171C602.751 491.642 532.866 297.07 474.897 53.5812C416.928 -189.907 392.829 -390.106 421.068 -393.577C449.308 -397.048 519.192 -202.475 577.161 41.0128C635.13 284.501 659.232 484.701 630.99 488.171Z"
          fill="url(#paint28_radial_204_154694)"
        />
        <path
          style={{
            mixBlendMode: "screen",
          }}
          d="M206.223 340.397C177.606 317.527 196.21 131.897 247.774 -74.2183C299.335 -280.336 364.334 -428.888 392.949 -406.019C421.563 -383.149 402.961 -197.519 351.398 8.59656C299.835 214.715 234.837 363.266 206.223 340.397Z"
          fill="url(#paint29_radial_204_154694)"
        />
        <path
          style={{
            mixBlendMode: "screen",
          }}
          d="M411.001 741.662C381.005 730.696 356.351 469.045 355.937 157.251C355.519 -154.544 379.496 -398.413 409.492 -387.447C439.486 -376.481 464.139 -114.83 464.557 196.965C464.972 508.759 440.994 752.628 411.001 741.662Z"
          fill="url(#paint30_radial_204_154694)"
        />
        <path
          style={{
            mixBlendMode: "screen",
          }}
          d="M386.48 557.654C287.099 553.216 210.937 334.593 216.364 69.3393C221.793 -195.912 306.757 -407.344 406.138 -402.908C505.52 -398.47 581.683 -179.847 576.254 85.4066C570.824 350.657 485.86 562.09 386.48 557.654Z"
          fill="url(#paint31_radial_204_154694)"
        />
        <path
          style={{
            mixBlendMode: "screen",
          }}
          d="M464.915 396.391C535.757 -16.0437 500.416 -366.323 385.978 -385.979C271.54 -405.635 121.341 -87.2256 50.4997 325.209C-20.342 737.644 14.9996 1087.92 129.437 1107.58C243.875 1127.24 394.074 808.826 464.915 396.391Z"
          fill="url(#paint32_radial_204_154694)"
        />
        <path
          style={{
            mixBlendMode: "screen",
          }}
          d="M804 -411.664H4V288.276H804V-411.664Z"
          fill="url(#paint33_radial_204_154694)"
        />
          </g>
        </g>
      </g>
    <defs>
      <filter
        id="filter0_d_204_154694"
        x={0}
        y={-411.664}
        width={808}
        height={1528.16}
        filterUnits="userSpaceOnUse"
        colorInterpolationFilters="sRGB"
      >
        <feFlood floodOpacity={0} result="BackgroundImageFix" />
        <feColorMatrix
          in="SourceAlpha"
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          result="hardAlpha"
        />
        <feOffset dy={4} />
        <feGaussianBlur stdDeviation={2} />
        <feComposite in2="hardAlpha" operator="out" />
        <feColorMatrix
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
        />
        <feBlend
          mode="normal"
          in2="BackgroundImageFix"
          result="effect1_dropShadow_204_154694"
        />
        <feBlend
          mode="normal"
          in="SourceGraphic"
          in2="effect1_dropShadow_204_154694"
          result="shape"
        />
      </filter>
      <filter
        id="filter1_f_204_154694"
        x={-20}
        y={-435.664}
        width={848}
        height={1568.11}
        filterUnits="userSpaceOnUse"
        colorInterpolationFilters="sRGB"
      >
        <feFlood floodOpacity={0} result="BackgroundImageFix" />
        <feBlend
          mode="normal"
          in="SourceGraphic"
          in2="BackgroundImageFix"
          result="shape"
        />
        <feGaussianBlur
          stdDeviation={12}
          result="effect1_foregroundBlur_204_154694"
        />
      </filter>
      <radialGradient
        id="paint0_radial_204_154694"
        cx={0}
        cy={0}
        r={1}
        gradientTransform="matrix(113.659 626.471 -41.2048 50.4522 553.249 232.526)"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#13F584" />
        <stop offset={0.04105} stopColor="#13F584" stopOpacity={0.89633} />
        <stop offset={0.13261} stopColor="#13F584" stopOpacity={0.68848} />
        <stop offset={0.2285} stopColor="#13F584" stopOpacity={0.50414} />
        <stop offset={0.3269} stopColor="#13F584" stopOpacity={0.34869} />
        <stop offset={0.42844} stopColor="#13F584" stopOpacity={0.222} />
        <stop offset={0.53405} stopColor="#13F584" stopOpacity={0.12398} />
        <stop offset={0.64551} stopColor="#13F584" stopOpacity={0.05442} />
        <stop offset={0.76683} stopColor="#13F584" stopOpacity={0.01316} />
        <stop offset={0.9162} stopColor="#13F584" stopOpacity={0} />
      </radialGradient>
      <radialGradient
        id="paint1_radial_204_154694"
        cx={0}
        cy={0}
        r={1}
        gradientTransform="matrix(-92.2579 631.36 42.8873 48.4673 276.593 238.836)"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#13F584" />
        <stop offset={0.04105} stopColor="#13F584" stopOpacity={0.89633} />
        <stop offset={0.13261} stopColor="#13F584" stopOpacity={0.68848} />
        <stop offset={0.2285} stopColor="#13F584" stopOpacity={0.50414} />
        <stop offset={0.3269} stopColor="#13F584" stopOpacity={0.34869} />
        <stop offset={0.42844} stopColor="#13F584" stopOpacity={0.222} />
        <stop offset={0.53405} stopColor="#13F584" stopOpacity={0.12398} />
        <stop offset={0.64551} stopColor="#13F584" stopOpacity={0.05442} />
        <stop offset={0.76683} stopColor="#13F584" stopOpacity={0.01316} />
        <stop offset={0.9162} stopColor="#13F584" stopOpacity={0} />
      </radialGradient>
      <radialGradient
        id="paint2_radial_204_154694"
        cx={0}
        cy={0}
        r={1}
        gradientTransform="matrix(146.118 551.901 -19.0141 35.435 588.005 164.375)"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#13F584" />
        <stop offset={0.04105} stopColor="#13F584" stopOpacity={0.89633} />
        <stop offset={0.13261} stopColor="#13F584" stopOpacity={0.68848} />
        <stop offset={0.2285} stopColor="#13F584" stopOpacity={0.50414} />
        <stop offset={0.3269} stopColor="#13F584" stopOpacity={0.34869} />
        <stop offset={0.42844} stopColor="#13F584" stopOpacity={0.222} />
        <stop offset={0.53405} stopColor="#13F584" stopOpacity={0.12398} />
        <stop offset={0.64551} stopColor="#13F584" stopOpacity={0.05442} />
        <stop offset={0.76683} stopColor="#13F584" stopOpacity={0.01316} />
        <stop offset={0.9162} stopColor="#13F584" stopOpacity={0} />
      </radialGradient>
      <radialGradient
        id="paint3_radial_204_154694"
        cx={0}
        cy={0}
        r={1}
        gradientTransform="matrix(-138.045 554.727 19.527 35.051 221.703 168.476)"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#13F584" />
        <stop offset={0.04105} stopColor="#13F584" stopOpacity={0.89633} />
        <stop offset={0.13261} stopColor="#13F584" stopOpacity={0.68848} />
        <stop offset={0.2285} stopColor="#13F584" stopOpacity={0.50414} />
        <stop offset={0.3269} stopColor="#13F584" stopOpacity={0.34869} />
        <stop offset={0.42844} stopColor="#13F584" stopOpacity={0.222} />
        <stop offset={0.53405} stopColor="#13F584" stopOpacity={0.12398} />
        <stop offset={0.64551} stopColor="#13F584" stopOpacity={0.05442} />
        <stop offset={0.76683} stopColor="#13F584" stopOpacity={0.01316} />
        <stop offset={0.9162} stopColor="#13F584" stopOpacity={0} />
      </radialGradient>
      <radialGradient
        id="paint4_radial_204_154694"
        cx={0}
        cy={0}
        r={1}
        gradientTransform="matrix(-41.3959 684.158 -22.3527 -9.14453 348.41 291.524)"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#13F584" />
        <stop offset={0.04105} stopColor="#13F584" stopOpacity={0.89633} />
        <stop offset={0.13261} stopColor="#13F584" stopOpacity={0.68848} />
        <stop offset={0.2285} stopColor="#13F584" stopOpacity={0.50414} />
        <stop offset={0.3269} stopColor="#13F584" stopOpacity={0.34869} />
        <stop offset={0.42844} stopColor="#13F584" stopOpacity={0.222} />
        <stop offset={0.53405} stopColor="#13F584" stopOpacity={0.12398} />
        <stop offset={0.64551} stopColor="#13F584" stopOpacity={0.05442} />
        <stop offset={0.76683} stopColor="#13F584" stopOpacity={0.01316} />
        <stop offset={0.9162} stopColor="#13F584" stopOpacity={0} />
      </radialGradient>
      <radialGradient
        id="paint5_radial_204_154694"
        cx={0}
        cy={0}
        r={1}
        gradientTransform="matrix(41.3959 684.158 22.3527 -9.14453 463.183 288.252)"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#13F584" />
        <stop offset={0.04105} stopColor="#13F584" stopOpacity={0.89633} />
        <stop offset={0.13261} stopColor="#13F584" stopOpacity={0.68848} />
        <stop offset={0.2285} stopColor="#13F584" stopOpacity={0.50414} />
        <stop offset={0.3269} stopColor="#13F584" stopOpacity={0.34869} />
        <stop offset={0.42844} stopColor="#13F584" stopOpacity={0.222} />
        <stop offset={0.53405} stopColor="#13F584" stopOpacity={0.12398} />
        <stop offset={0.64551} stopColor="#13F584" stopOpacity={0.05442} />
        <stop offset={0.76683} stopColor="#13F584" stopOpacity={0.01316} />
        <stop offset={0.9162} stopColor="#13F584" stopOpacity={0} />
      </radialGradient>
      <radialGradient
        id="paint6_radial_204_154694"
        cx={0}
        cy={0}
        r={1}
        gradientTransform="matrix(-1.70853 685.725 -22.8347 -7.3006 406.304 304.827)"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#13F584" />
        <stop offset={0.04105} stopColor="#13F584" stopOpacity={0.89633} />
        <stop offset={0.13261} stopColor="#13F584" stopOpacity={0.68848} />
        <stop offset={0.2285} stopColor="#13F584" stopOpacity={0.50414} />
        <stop offset={0.3269} stopColor="#13F584" stopOpacity={0.34869} />
        <stop offset={0.42844} stopColor="#13F584" stopOpacity={0.222} />
        <stop offset={0.53405} stopColor="#13F584" stopOpacity={0.12398} />
        <stop offset={0.64551} stopColor="#13F584" stopOpacity={0.05442} />
        <stop offset={0.76683} stopColor="#13F584" stopOpacity={0.01316} />
        <stop offset={0.9162} stopColor="#13F584" stopOpacity={0} />
      </radialGradient>
      <radialGradient
        id="paint7_radial_204_154694"
        cx={0}
        cy={0}
        r={1}
        gradientTransform="matrix(45.9487 349.413 -16.6577 28.1396 462.975 -42.2193)"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#13F584" />
        <stop offset={0.04105} stopColor="#13F584" stopOpacity={0.89633} />
        <stop offset={0.13261} stopColor="#13F584" stopOpacity={0.68848} />
        <stop offset={0.2285} stopColor="#13F584" stopOpacity={0.50414} />
        <stop offset={0.3269} stopColor="#13F584" stopOpacity={0.34869} />
        <stop offset={0.42844} stopColor="#13F584" stopOpacity={0.222} />
        <stop offset={0.53405} stopColor="#13F584" stopOpacity={0.12398} />
        <stop offset={0.64551} stopColor="#13F584" stopOpacity={0.05442} />
        <stop offset={0.76683} stopColor="#13F584" stopOpacity={0.01316} />
        <stop offset={0.9162} stopColor="#13F584" stopOpacity={0} />
      </radialGradient>
      <radialGradient
        id="paint8_radial_204_154694"
        cx={0}
        cy={0}
        r={1}
        gradientTransform="matrix(-37.2933 352.122 17.338 27.0312 348.072 -40.4323)"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#13F584" />
        <stop offset={0.04105} stopColor="#13F584" stopOpacity={0.89633} />
        <stop offset={0.13261} stopColor="#13F584" stopOpacity={0.68848} />
        <stop offset={0.2285} stopColor="#13F584" stopOpacity={0.50414} />
        <stop offset={0.3269} stopColor="#13F584" stopOpacity={0.34869} />
        <stop offset={0.42844} stopColor="#13F584" stopOpacity={0.222} />
        <stop offset={0.53405} stopColor="#13F584" stopOpacity={0.12398} />
        <stop offset={0.64551} stopColor="#13F584" stopOpacity={0.05442} />
        <stop offset={0.76683} stopColor="#13F584" stopOpacity={0.01316} />
        <stop offset={0.9162} stopColor="#13F584" stopOpacity={0} />
      </radialGradient>
      <radialGradient
        id="paint9_radial_204_154694"
        cx={0}
        cy={0}
        r={1}
        gradientTransform="matrix(59.0661 307.846 -7.68585 19.7654 486.142 -80.0019)"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#13F584" />
        <stop offset={0.04105} stopColor="#13F584" stopOpacity={0.89633} />
        <stop offset={0.13261} stopColor="#13F584" stopOpacity={0.68848} />
        <stop offset={0.2285} stopColor="#13F584" stopOpacity={0.50414} />
        <stop offset={0.3269} stopColor="#13F584" stopOpacity={0.34869} />
        <stop offset={0.42844} stopColor="#13F584" stopOpacity={0.222} />
        <stop offset={0.53405} stopColor="#13F584" stopOpacity={0.12398} />
        <stop offset={0.64551} stopColor="#13F584" stopOpacity={0.05442} />
        <stop offset={0.76683} stopColor="#13F584" stopOpacity={0.01316} />
        <stop offset={0.9162} stopColor="#13F584" stopOpacity={0} />
      </radialGradient>
      <radialGradient
        id="paint10_radial_204_154694"
        cx={0}
        cy={0}
        r={1}
        gradientTransform="matrix(122.097 294.222 -3.38863 20.772 554.478 -86.6262)"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#13F584" />
        <stop offset={0.04105} stopColor="#13F584" stopOpacity={0.89633} />
        <stop offset={0.13261} stopColor="#13F584" stopOpacity={0.68848} />
        <stop offset={0.2285} stopColor="#13F584" stopOpacity={0.50414} />
        <stop offset={0.3269} stopColor="#13F584" stopOpacity={0.34869} />
        <stop offset={0.42844} stopColor="#13F584" stopOpacity={0.222} />
        <stop offset={0.53405} stopColor="#13F584" stopOpacity={0.12398} />
        <stop offset={0.64551} stopColor="#13F584" stopOpacity={0.05442} />
        <stop offset={0.76683} stopColor="#13F584" stopOpacity={0.01316} />
        <stop offset={0.9162} stopColor="#13F584" stopOpacity={0} />
      </radialGradient>
      <radialGradient
        id="paint11_radial_204_154694"
        cx={0}
        cy={0}
        r={1}
        gradientTransform="matrix(-102.921 297.234 -16.6895 13.8676 276.592 -96.1095)"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#13F584" />
        <stop offset={0.04105} stopColor="#13F584" stopOpacity={0.89633} />
        <stop offset={0.13261} stopColor="#13F584" stopOpacity={0.68848} />
        <stop offset={0.2285} stopColor="#13F584" stopOpacity={0.50414} />
        <stop offset={0.3269} stopColor="#13F584" stopOpacity={0.34869} />
        <stop offset={0.42844} stopColor="#13F584" stopOpacity={0.222} />
        <stop offset={0.53405} stopColor="#13F584" stopOpacity={0.12398} />
        <stop offset={0.64551} stopColor="#13F584" stopOpacity={0.05442} />
        <stop offset={0.76683} stopColor="#13F584" stopOpacity={0.01316} />
        <stop offset={0.9162} stopColor="#13F584" stopOpacity={0} />
      </radialGradient>
      <radialGradient
        id="paint12_radial_204_154694"
        cx={0}
        cy={0}
        r={1}
        gradientTransform="matrix(-55.8007 309.391 7.8959 19.5492 324.969 -78.7127)"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#13F584" />
        <stop offset={0.04105} stopColor="#13F584" stopOpacity={0.89633} />
        <stop offset={0.13261} stopColor="#13F584" stopOpacity={0.68848} />
        <stop offset={0.2285} stopColor="#13F584" stopOpacity={0.50414} />
        <stop offset={0.3269} stopColor="#13F584" stopOpacity={0.34869} />
        <stop offset={0.42844} stopColor="#13F584" stopOpacity={0.222} />
        <stop offset={0.53405} stopColor="#13F584" stopOpacity={0.12398} />
        <stop offset={0.64551} stopColor="#13F584" stopOpacity={0.05442} />
        <stop offset={0.76683} stopColor="#13F584" stopOpacity={0.01316} />
        <stop offset={0.9162} stopColor="#13F584" stopOpacity={0} />
      </radialGradient>
      <radialGradient
        id="paint13_radial_204_154694"
        cx={0}
        cy={0}
        r={1}
        gradientTransform="matrix(-16.7368 381.656 -9.03426 -5.10126 380.173 -9.28948)"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#13F584" />
        <stop offset={0.04105} stopColor="#13F584" stopOpacity={0.89633} />
        <stop offset={0.13261} stopColor="#13F584" stopOpacity={0.68848} />
        <stop offset={0.2285} stopColor="#13F584" stopOpacity={0.50414} />
        <stop offset={0.3269} stopColor="#13F584" stopOpacity={0.34869} />
        <stop offset={0.42844} stopColor="#13F584" stopOpacity={0.222} />
        <stop offset={0.53405} stopColor="#13F584" stopOpacity={0.12398} />
        <stop offset={0.64551} stopColor="#13F584" stopOpacity={0.05442} />
        <stop offset={0.76683} stopColor="#13F584" stopOpacity={0.01316} />
        <stop offset={0.9162} stopColor="#13F584" stopOpacity={0} />
      </radialGradient>
      <radialGradient
        id="paint14_radial_204_154694"
        cx={0}
        cy={0}
        r={1}
        gradientTransform="matrix(16.7368 381.656 9.03426 -5.10126 426.568 -11.0323)"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#13F584" />
        <stop offset={0.04105} stopColor="#13F584" stopOpacity={0.89633} />
        <stop offset={0.13261} stopColor="#13F584" stopOpacity={0.68848} />
        <stop offset={0.2285} stopColor="#13F584" stopOpacity={0.50414} />
        <stop offset={0.3269} stopColor="#13F584" stopOpacity={0.34869} />
        <stop offset={0.42844} stopColor="#13F584" stopOpacity={0.222} />
        <stop offset={0.53405} stopColor="#13F584" stopOpacity={0.12398} />
        <stop offset={0.64551} stopColor="#13F584" stopOpacity={0.05442} />
        <stop offset={0.76683} stopColor="#13F584" stopOpacity={0.01316} />
        <stop offset={0.9162} stopColor="#13F584" stopOpacity={0} />
      </radialGradient>
      <radialGradient
        id="paint15_radial_204_154694"
        cx={0}
        cy={0}
        r={1}
        gradientTransform="matrix(-0.695943 382.546 -9.22881 -4.07279 403.575 -1.54039)"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#13F584" />
        <stop offset={0.04105} stopColor="#13F584" stopOpacity={0.89633} />
        <stop offset={0.13261} stopColor="#13F584" stopOpacity={0.68848} />
        <stop offset={0.2285} stopColor="#13F584" stopOpacity={0.50414} />
        <stop offset={0.3269} stopColor="#13F584" stopOpacity={0.34869} />
        <stop offset={0.42844} stopColor="#13F584" stopOpacity={0.222} />
        <stop offset={0.53405} stopColor="#13F584" stopOpacity={0.12398} />
        <stop offset={0.64551} stopColor="#13F584" stopOpacity={0.05442} />
        <stop offset={0.76683} stopColor="#13F584" stopOpacity={0.01316} />
        <stop offset={0.9162} stopColor="#13F584" stopOpacity={0} />
      </radialGradient>
      <radialGradient
        id="paint16_radial_204_154694"
        cx={0}
        cy={0}
        r={1}
        gradientTransform="matrix(144.058 385.227 -70.5917 23.9022 564.048 -9.18999)"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#13F584" />
        <stop offset={0.04105} stopColor="#13F584" stopOpacity={0.89633} />
        <stop offset={0.13261} stopColor="#13F584" stopOpacity={0.68848} />
        <stop offset={0.2285} stopColor="#13F584" stopOpacity={0.50414} />
        <stop offset={0.3269} stopColor="#13F584" stopOpacity={0.34869} />
        <stop offset={0.42844} stopColor="#13F584" stopOpacity={0.222} />
        <stop offset={0.53405} stopColor="#13F584" stopOpacity={0.12398} />
        <stop offset={0.64551} stopColor="#13F584" stopOpacity={0.05442} />
        <stop offset={0.76683} stopColor="#13F584" stopOpacity={0.01316} />
        <stop offset={0.9162} stopColor="#13F584" stopOpacity={0} />
      </radialGradient>
      <radialGradient
        id="paint17_radial_204_154694"
        cx={0}
        cy={0}
        r={1}
        gradientTransform="matrix(-129.547 389.864 -71.4377 -21.507 251.652 -6.61855)"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#13F584" />
        <stop offset={0.04105} stopColor="#13F584" stopOpacity={0.89633} />
        <stop offset={0.13261} stopColor="#13F584" stopOpacity={0.68848} />
        <stop offset={0.2285} stopColor="#13F584" stopOpacity={0.50414} />
        <stop offset={0.3269} stopColor="#13F584" stopOpacity={0.34869} />
        <stop offset={0.42844} stopColor="#13F584" stopOpacity={0.222} />
        <stop offset={0.53405} stopColor="#13F584" stopOpacity={0.12398} />
        <stop offset={0.64551} stopColor="#13F584" stopOpacity={0.05442} />
        <stop offset={0.76683} stopColor="#13F584" stopOpacity={0.01316} />
        <stop offset={0.9162} stopColor="#13F584" stopOpacity={0} />
      </radialGradient>
      <radialGradient
        id="paint18_radial_204_154694"
        cx={0}
        cy={0}
        r={1}
        gradientUnits="userSpaceOnUse"
        gradientTransform="translate(404 155.568) rotate(90) scale(540.101 74.9216)"
      >
        <stop stopColor="#13F584" />
        <stop offset={0.04105} stopColor="#13F584" stopOpacity={0.89633} />
        <stop offset={0.13261} stopColor="#13F584" stopOpacity={0.68848} />
        <stop offset={0.2285} stopColor="#13F584" stopOpacity={0.50414} />
        <stop offset={0.3269} stopColor="#13F584" stopOpacity={0.34869} />
        <stop offset={0.42844} stopColor="#13F584" stopOpacity={0.222} />
        <stop offset={0.53405} stopColor="#13F584" stopOpacity={0.12398} />
        <stop offset={0.64551} stopColor="#13F584" stopOpacity={0.05442} />
        <stop offset={0.76683} stopColor="#13F584" stopOpacity={0.01316} />
        <stop offset={0.9162} stopColor="#13F584" stopOpacity={0} />
      </radialGradient>
      <radialGradient
        id="paint19_radial_204_154694"
        cx={0}
        cy={0}
        r={1}
        gradientTransform="matrix(33.7749 377.298 -12.0398 25.0052 452.719 -13.5017)"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#13F584" />
        <stop offset={0.04105} stopColor="#13F584" stopOpacity={0.89633} />
        <stop offset={0.13261} stopColor="#13F584" stopOpacity={0.68848} />
        <stop offset={0.2285} stopColor="#13F584" stopOpacity={0.50414} />
        <stop offset={0.3269} stopColor="#13F584" stopOpacity={0.34869} />
        <stop offset={0.42844} stopColor="#13F584" stopOpacity={0.222} />
        <stop offset={0.53405} stopColor="#13F584" stopOpacity={0.12398} />
        <stop offset={0.64551} stopColor="#13F584" stopOpacity={0.05442} />
        <stop offset={0.76683} stopColor="#13F584" stopOpacity={0.01316} />
        <stop offset={0.9162} stopColor="#13F584" stopOpacity={0} />
      </radialGradient>
      <radialGradient
        id="paint20_radial_204_154694"
        cx={0}
        cy={0}
        r={1}
        gradientTransform="matrix(-26.541 358.261 12.6047 32.854 369.43 -42.7669)"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#13F584" />
        <stop offset={0.04105} stopColor="#13F584" stopOpacity={0.89633} />
        <stop offset={0.13261} stopColor="#13F584" stopOpacity={0.68848} />
        <stop offset={0.2285} stopColor="#13F584" stopOpacity={0.50414} />
        <stop offset={0.3269} stopColor="#13F584" stopOpacity={0.34869} />
        <stop offset={0.42844} stopColor="#13F584" stopOpacity={0.222} />
        <stop offset={0.53405} stopColor="#13F584" stopOpacity={0.12398} />
        <stop offset={0.64551} stopColor="#13F584" stopOpacity={0.05442} />
        <stop offset={0.76683} stopColor="#13F584" stopOpacity={0.01316} />
        <stop offset={0.9162} stopColor="#13F584" stopOpacity={0} />
      </radialGradient>
      <radialGradient
        id="paint21_radial_204_154694"
        cx={0}
        cy={0}
        r={1}
        gradientTransform="matrix(43.2708 337.572 -5.53939 18.6311 469.458 -47.2823)"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#13F584" />
        <stop offset={0.04105} stopColor="#13F584" stopOpacity={0.89633} />
        <stop offset={0.13261} stopColor="#13F584" stopOpacity={0.68848} />
        <stop offset={0.2285} stopColor="#13F584" stopOpacity={0.50414} />
        <stop offset={0.3269} stopColor="#13F584" stopOpacity={0.34869} />
        <stop offset={0.42844} stopColor="#13F584" stopOpacity={0.222} />
        <stop offset={0.53405} stopColor="#13F584" stopOpacity={0.12398} />
        <stop offset={0.64551} stopColor="#13F584" stopOpacity={0.05442} />
        <stop offset={0.76683} stopColor="#13F584" stopOpacity={0.01316} />
        <stop offset={0.9162} stopColor="#13F584" stopOpacity={0} />
      </radialGradient>
      <radialGradient
        id="paint22_radial_204_154694"
        cx={0}
        cy={0}
        r={1}
        gradientTransform="matrix(111.336 330.064 -0.786723 21.703 538.093 -54.999)"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#13F584" />
        <stop offset={0.04105} stopColor="#13F584" stopOpacity={0.89633} />
        <stop offset={0.13261} stopColor="#13F584" stopOpacity={0.68848} />
        <stop offset={0.2285} stopColor="#13F584" stopOpacity={0.50414} />
        <stop offset={0.3269} stopColor="#13F584" stopOpacity={0.34869} />
        <stop offset={0.42844} stopColor="#13F584" stopOpacity={0.222} />
        <stop offset={0.53405} stopColor="#13F584" stopOpacity={0.12398} />
        <stop offset={0.64551} stopColor="#13F584" stopOpacity={0.05442} />
        <stop offset={0.76683} stopColor="#13F584" stopOpacity={0.01316} />
        <stop offset={0.9162} stopColor="#13F584" stopOpacity={0} />
      </radialGradient>
      <radialGradient
        id="paint23_radial_204_154694"
        cx={0}
        cy={0}
        r={1}
        gradientTransform="matrix(-81.5139 283.442 -13.2704 10.0716 310.783 -119.459)"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#13F584" />
        <stop offset={0.04105} stopColor="#13F584" stopOpacity={0.89633} />
        <stop offset={0.13261} stopColor="#13F584" stopOpacity={0.68848} />
        <stop offset={0.2285} stopColor="#13F584" stopOpacity={0.50414} />
        <stop offset={0.3269} stopColor="#13F584" stopOpacity={0.34869} />
        <stop offset={0.42844} stopColor="#13F584" stopOpacity={0.222} />
        <stop offset={0.53405} stopColor="#13F584" stopOpacity={0.12398} />
        <stop offset={0.64551} stopColor="#13F584" stopOpacity={0.05442} />
        <stop offset={0.76683} stopColor="#13F584" stopOpacity={0.01316} />
        <stop offset={0.9162} stopColor="#13F584" stopOpacity={0} />
      </radialGradient>
      <radialGradient
        id="paint24_radial_204_154694"
        cx={0}
        cy={0}
        r={1}
        gradientTransform="matrix(-40.0133 308.657 5.7486 22.533 352.631 -89.2988)"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#13F584" />
        <stop offset={0.04105} stopColor="#13F584" stopOpacity={0.89633} />
        <stop offset={0.13261} stopColor="#13F584" stopOpacity={0.68848} />
        <stop offset={0.2285} stopColor="#13F584" stopOpacity={0.50414} />
        <stop offset={0.3269} stopColor="#13F584" stopOpacity={0.34869} />
        <stop offset={0.42844} stopColor="#13F584" stopOpacity={0.222} />
        <stop offset={0.53405} stopColor="#13F584" stopOpacity={0.12398} />
        <stop offset={0.64551} stopColor="#13F584" stopOpacity={0.05442} />
        <stop offset={0.76683} stopColor="#13F584" stopOpacity={0.01316} />
        <stop offset={0.9162} stopColor="#13F584" stopOpacity={0} />
      </radialGradient>
      <radialGradient
        id="paint25_radial_204_154694"
        cx={0}
        cy={0}
        r={1}
        gradientTransform="matrix(-11.6097 394.612 -6.55408 -7.72717 392.742 -1.69867)"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#13F584" />
        <stop offset={0.04105} stopColor="#13F584" stopOpacity={0.89633} />
        <stop offset={0.13261} stopColor="#13F584" stopOpacity={0.68848} />
        <stop offset={0.2285} stopColor="#13F584" stopOpacity={0.50414} />
        <stop offset={0.3269} stopColor="#13F584" stopOpacity={0.34869} />
        <stop offset={0.42844} stopColor="#13F584" stopOpacity={0.222} />
        <stop offset={0.53405} stopColor="#13F584" stopOpacity={0.12398} />
        <stop offset={0.64551} stopColor="#13F584" stopOpacity={0.05442} />
        <stop offset={0.76683} stopColor="#13F584" stopOpacity={0.01316} />
        <stop offset={0.9162} stopColor="#13F584" stopOpacity={0} />
      </radialGradient>
      <radialGradient
        id="paint26_radial_204_154694"
        cx={0}
        cy={0}
        r={1}
        gradientTransform="matrix(12.6561 403.062 6.54729 -2.93191 426.372 9.64002)"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#13F584" />
        <stop offset={0.04105} stopColor="#13F584" stopOpacity={0.89633} />
        <stop offset={0.13261} stopColor="#13F584" stopOpacity={0.68848} />
        <stop offset={0.2285} stopColor="#13F584" stopOpacity={0.50414} />
        <stop offset={0.3269} stopColor="#13F584" stopOpacity={0.34869} />
        <stop offset={0.42844} stopColor="#13F584" stopOpacity={0.222} />
        <stop offset={0.53405} stopColor="#13F584" stopOpacity={0.12398} />
        <stop offset={0.64551} stopColor="#13F584" stopOpacity={0.05442} />
        <stop offset={0.76683} stopColor="#13F584" stopOpacity={0.01316} />
        <stop offset={0.9162} stopColor="#13F584" stopOpacity={0} />
      </radialGradient>
      <radialGradient
        id="paint27_radial_204_154694"
        cx={0}
        cy={0}
        r={1}
        gradientTransform="matrix(0.030246 399.535 -6.69948 -6.6934 409.717 13.0009)"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#13F584" />
        <stop offset={0.04105} stopColor="#13F584" stopOpacity={0.89633} />
        <stop offset={0.13261} stopColor="#13F584" stopOpacity={0.68848} />
        <stop offset={0.2285} stopColor="#13F584" stopOpacity={0.50414} />
        <stop offset={0.3269} stopColor="#13F584" stopOpacity={0.34869} />
        <stop offset={0.42844} stopColor="#13F584" stopOpacity={0.222} />
        <stop offset={0.53405} stopColor="#13F584" stopOpacity={0.12398} />
        <stop offset={0.64551} stopColor="#13F584" stopOpacity={0.05442} />
        <stop offset={0.76683} stopColor="#13F584" stopOpacity={0.01316} />
        <stop offset={0.9162} stopColor="#13F584" stopOpacity={0} />
      </radialGradient>
      <radialGradient
        id="paint28_radial_204_154694"
        cx={0}
        cy={0}
        r={1}
        gradientTransform="matrix(104.96 440.849 -51.1337 6.28884 526.029 47.2542)"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#13F584" />
        <stop offset={0.04105} stopColor="#13F584" stopOpacity={0.89633} />
        <stop offset={0.13261} stopColor="#13F584" stopOpacity={0.68848} />
        <stop offset={0.2285} stopColor="#13F584" stopOpacity={0.50414} />
        <stop offset={0.3269} stopColor="#13F584" stopOpacity={0.34869} />
        <stop offset={0.42844} stopColor="#13F584" stopOpacity={0.222} />
        <stop offset={0.53405} stopColor="#13F584" stopOpacity={0.12398} />
        <stop offset={0.64551} stopColor="#13F584" stopOpacity={0.05442} />
        <stop offset={0.76683} stopColor="#13F584" stopOpacity={0.01316} />
        <stop offset={0.9162} stopColor="#13F584" stopOpacity={0} />
      </radialGradient>
      <radialGradient
        id="paint29_radial_204_154694"
        cx={0}
        cy={0}
        r={1}
        gradientTransform="matrix(-93.3592 373.196 -51.8158 -41.4012 299.586 -32.8007)"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#13F584" />
        <stop offset={0.04105} stopColor="#13F584" stopOpacity={0.89633} />
        <stop offset={0.13261} stopColor="#13F584" stopOpacity={0.68848} />
        <stop offset={0.2285} stopColor="#13F584" stopOpacity={0.50414} />
        <stop offset={0.3269} stopColor="#13F584" stopOpacity={0.34869} />
        <stop offset={0.42844} stopColor="#13F584" stopOpacity={0.222} />
        <stop offset={0.53405} stopColor="#13F584" stopOpacity={0.12398} />
        <stop offset={0.64551} stopColor="#13F584" stopOpacity={0.05442} />
        <stop offset={0.76683} stopColor="#13F584" stopOpacity={0.01316} />
        <stop offset={0.9162} stopColor="#13F584" stopOpacity={0} />
      </radialGradient>
      <radialGradient
        id="paint30_radial_204_154694"
        cx={0}
        cy={0}
        r={1}
        gradientTransform="matrix(0.756429 564.538 -54.3116 -19.8608 410.247 177.153)"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#13F584" />
        <stop offset={0.04105} stopColor="#13F584" stopOpacity={0.89633} />
        <stop offset={0.13261} stopColor="#13F584" stopOpacity={0.68848} />
        <stop offset={0.2285} stopColor="#13F584" stopOpacity={0.50414} />
        <stop offset={0.3269} stopColor="#13F584" stopOpacity={0.34869} />
        <stop offset={0.42844} stopColor="#13F584" stopOpacity={0.222} />
        <stop offset={0.53405} stopColor="#13F584" stopOpacity={0.12398} />
        <stop offset={0.64551} stopColor="#13F584" stopOpacity={0.05442} />
        <stop offset={0.76683} stopColor="#13F584" stopOpacity={0.01316} />
        <stop offset={0.9162} stopColor="#13F584" stopOpacity={0} />
      </radialGradient>
      <radialGradient
        id="paint31_radial_204_154694"
        cx={0}
        cy={0}
        r={1}
        gradientTransform="matrix(-9.84267 480.269 -179.95 -8.03729 396.309 77.4101)"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#13F584" />
        <stop offset={0.04105} stopColor="#13F584" stopOpacity={0.89633} />
        <stop offset={0.13261} stopColor="#13F584" stopOpacity={0.68848} />
        <stop offset={0.2285} stopColor="#13F584" stopOpacity={0.50414} />
        <stop offset={0.3269} stopColor="#13F584" stopOpacity={0.34869} />
        <stop offset={0.42844} stopColor="#13F584" stopOpacity={0.222} />
        <stop offset={0.53405} stopColor="#13F584" stopOpacity={0.12398} />
        <stop offset={0.64551} stopColor="#13F584" stopOpacity={0.05442} />
        <stop offset={0.76683} stopColor="#13F584" stopOpacity={0.01316} />
        <stop offset={0.9162} stopColor="#13F584" stopOpacity={0} />
      </radialGradient>
      <radialGradient
        id="paint32_radial_204_154694"
        cx={0}
        cy={0}
        r={1}
        gradientTransform="matrix(-140.981 743.06 -198.779 -82.2674 257.724 360.772)"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#13F584" />
        <stop offset={0.04105} stopColor="#13F584" stopOpacity={0.89633} />
        <stop offset={0.13261} stopColor="#13F584" stopOpacity={0.68848} />
        <stop offset={0.2285} stopColor="#13F584" stopOpacity={0.50414} />
        <stop offset={0.3269} stopColor="#13F584" stopOpacity={0.34869} />
        <stop offset={0.42844} stopColor="#13F584" stopOpacity={0.222} />
        <stop offset={0.53405} stopColor="#13F584" stopOpacity={0.12398} />
        <stop offset={0.64551} stopColor="#13F584" stopOpacity={0.05442} />
        <stop offset={0.76683} stopColor="#13F584" stopOpacity={0.01316} />
        <stop offset={0.9162} stopColor="#13F584" stopOpacity={0} />
      </radialGradient>
      <radialGradient
        id="paint33_radial_204_154694"
        cx={0}
        cy={0}
        r={1}
        gradientUnits="userSpaceOnUse"
        gradientTransform="translate(404 -61.6941) scale(375.818 375.818)"
      >
        <stop stopColor="#13F584" />
        <stop offset={0.04105} stopColor="#13F584" stopOpacity={0.89633} />
        <stop offset={0.13261} stopColor="#13F584" stopOpacity={0.68848} />
        <stop offset={0.2285} stopColor="#13F584" stopOpacity={0.50414} />
        <stop offset={0.3269} stopColor="#13F584" stopOpacity={0.34869} />
        <stop offset={0.42844} stopColor="#13F584" stopOpacity={0.222} />
        <stop offset={0.53405} stopColor="#13F584" stopOpacity={0.12398} />
        <stop offset={0.64551} stopColor="#13F584" stopOpacity={0.05442} />
        <stop offset={0.76683} stopColor="#13F584" stopOpacity={0.01316} />
        <stop offset={0.9162} stopColor="#13F584" stopOpacity={0} />
      </radialGradient>
      <clipPath id="clip0_204_154694">
        <rect
          width={800}
          height={1520.16}
          fill="white"
          transform="translate(4 -411.664)"
        />
      </clipPath>
    </defs>
  </svg>
  );
};

export default Frame;
