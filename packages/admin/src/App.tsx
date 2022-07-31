import { BuggyCounterA } from './buggyCounter';
import { ErrorBoundary } from './errorBoundary';

function App() {
  // const webActonRecord = new WebActionsRecord();
  const startRRweb = () => {
    // webActonRecord.startRecord();
  };

  const stop = () => {
    // webActonRecord.stopRecord();
  };

  const play = () => {
    // axios.get('https://autumnfish.cn/search');
    // console.log(webActonRecord.recordEventList, 'webActonRecord.recordEventList');
    // new rrwebPlayer({
    //   target: document.body, // 可以自定义 DOM 元素
    //   props: {
    //     events: webActonRecord.recordEventList
    //   }
    // });
  };

  return (
    <ErrorBoundary>
      <BuggyCounterA />
    </ErrorBoundary>
  );
}

export default App;
