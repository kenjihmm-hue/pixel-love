import List "mo:core/List";
import PhotoTypes "../types/photos";
import PhotoLib "../lib/photos";

mixin (photos : List.List<PhotoTypes.PhotoMeta>) {
  public query func getPhotos() : async [PhotoTypes.PhotoMeta] {
    PhotoLib.getAll(photos);
  };
};
