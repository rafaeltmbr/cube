window.addEventListener('load', implementCubeMovement);

function implementCubeMovement() {
  const cube = document.querySelector('.cube');
  const lastOffset = { x: -42, y: 33 };
  const offset = {};

  function allowCubeMovement(startEvent) {
    const isTouch = startEvent.touches;
    const { pageX, pageY } = isTouch ? startEvent.touches[0] : startEvent;

    function handleCubeMovement(moveEvent) {
      const { pageX: pX, pageY: pY } = isTouch ? moveEvent.touches[0] : moveEvent;
      offset.x = (pX - pageX + lastOffset.x) % 360;
      offset.y = (pY - pageY + lastOffset.y) % 360;
      cube.style = `--rotateX: ${-offset.y}deg; --rotateY: ${offset.x}deg;`;
    }

    function endCubeMovement() {
      window.removeEventListener(isTouch ? 'touchmove' : 'mousemove', handleCubeMovement);
      window.removeEventListener(isTouch ? 'touchend' : 'mouseup', endCubeMovement);
      lastOffset.x = offset.x;
      lastOffset.y = offset.y;
    }

    window.addEventListener(isTouch ? 'touchmove' : 'mousemove', handleCubeMovement);
    window.addEventListener(isTouch ? 'touchend' : 'mouseup', endCubeMovement);
  }

  cube.addEventListener('mousedown', allowCubeMovement);
  cube.addEventListener('touchstart', allowCubeMovement);
}
