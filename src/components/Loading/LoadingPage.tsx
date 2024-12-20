import LoadingBar from 'react-top-loading-bar'

interface ILoadingPage {
  progress: number;
  setProgress: (() => void) | undefined
  delay: number
}

const LoadingPage = ({progress, delay, setProgress} : ILoadingPage) => {
  return (
    <div>
      <LoadingBar
        color="#FFA21A"
        height={5}
        progress={progress}
        loaderSpeed={delay}
        onLoaderFinished={setProgress}
        transitionTime={delay}
      />
    </div>
  );
};

export default LoadingPage;
