export default function createMediaListEntryData(
  id: number,
  startDate: any,
  myStatus: string,
  mediaType: string,
) {
  return {
    completedAt: { year: null, month: null, day: null },
    mediaId: id,
    notes: null,
    progress: 0,
    progressVolumes: mediaType === 'ANIME' ? null : 0, // if anime, then null
    repeat: 0,
    score: 0,
    startedAt: startDate, // today's date
    status: myStatus, // where you want to put it
    private: false, // default is false
  };
}
