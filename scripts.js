window.addEventListener('load', implementCubeMovement);

function implementCubeMovement() {
  const cube = document.querySelector('.cube');
  const lastOffset = { x: -42, y: 33 };
  const offset = {};

  function allowCubeMovement(startEvent) {
    const isTouch = startEvent.touches;
    const { pageX, pageY } = isTouch ? startEvent.touches[0] : startEvent;
    const last = { x: pageX, y: pageY };
    offset.y = lastOffset.y;
    offset.x = lastOffset.x;

    function handleCubeMovement(moveEvent) {
      const { pageX: pX, pageY: pY } = isTouch ? moveEvent.touches[0] : moveEvent;
      offset.x += pX - last.x;
      offset.y += pY - last.y;
      offset.x = offset.x % 360;
      offset.y = offset.y >= 45 ? 45 : offset.y <= -45 ? -45 : offset.y;
      last.y = pY;
      last.x = pX;
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
