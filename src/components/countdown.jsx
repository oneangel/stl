import { CountdownCircleTimer } from 'react-countdown-circle-timer';

const UrgeWithPleasureComponent = () => (
  <CountdownCircleTimer
    isPlaying
    duration={7}
    colors={['#004777', '#F7B801', '#A30000', '#A30000']}
    colorsTime={[7, 5, 2, 0]}
  >
    {({ remainingTime }) => <div className="text-3xl font-bold text-white">{remainingTime}</div>}
  </CountdownCircleTimer>
);

export default UrgeWithPleasureComponent;
