export type FlickrResult = {
  body: {
    photos: {
      photo: Array<{
        farm: string;
        server: string;
        id: string;
        secret: string;
      }>;
    };
  };
};
