import { onCLS, onINP, onLCP, onFCP, onTTFB } from 'web-vitals/attribution';

type PerfEntryCallback = (metric: { name: string; value: number; }) => void;

const reportWebVitals = (onPerfEntry?: PerfEntryCallback): void => {
  if (onPerfEntry && typeof onPerfEntry === 'function') {
    onCLS(onPerfEntry); // метрика, которая измеряет визуальную стабильность страницы
    onINP(onPerfEntry); // метрика, которая измеряет отзывчивость интерфейса
    onLCP(onPerfEntry); // метрика, которая измеряет время, необходимое для загрузки самого большого видимого элемента
    onFCP(onPerfEntry); // метрика, которая измеряет время, необходимое для того, чтобы браузер отобразил первый элемент
    onTTFB(onPerfEntry); // метрика, которая измеряет время, прошедшее с момента запроса к серверу до получения первого байта ответа
  }
};

export default reportWebVitals;