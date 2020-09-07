export const getFormatTime = (seconds) => {
  const hours = `${Math.floor(seconds / 3600)}h`;
  const minutes = `${Math.floor(seconds / 60) % 60}m`;
  const formatTime = hours.slice(0, 1) === `0` ? `${minutes}` : `${hours} ${minutes}`;

  return formatTime;
};

export const checkActiveElement = (active, activeClass) => active
  ? activeClass
  : ``;

export const escPressHandler = (evt, action) => {
  if (evt.key === `Escape` || evt.key === `Esc`) {
    evt.preventDefault();
    action();
    document.removeEventListener(`keydown`, escPressHandler);
  }
};

