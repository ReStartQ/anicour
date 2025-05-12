import { useAdvancedMedia } from 'renderer/context/advanced/AdvancedMediaContext';
import 'renderer/styles/Trailer.scss';

export default function MyTrailer({ props }: any) {
  const myAdvancedMedia: any = useAdvancedMedia();

  if (myAdvancedMedia.advancedMedia.trailer.site === 'youtube') {
    return (
      <iframe
        title="trailer"
        id="youtube"
        width={560}
        height={340}
        src={`https://www.youtube.com/embed/${myAdvancedMedia.advancedMedia.trailer.id}`}
        allowFullScreen
      />
    );
  }
  if (myAdvancedMedia.advancedMedia.trailer.site === 'dailymotion') {
    return (
      <iframe
        title="trailer"
        id="dailymotion"
        width={560}
        height={340}
        src={`https://www.dailymotion.com/embed/video/${myAdvancedMedia.advancedMedia.trailer.id}`}
        allowFullScreen
      />
    );
  }

  return (
    <iframe
      title="trailer"
      id="none"
      width={560}
      height={340}
      src=""
      allowFullScreen
    />
  );
}
// check if trailer is null + on youtube
