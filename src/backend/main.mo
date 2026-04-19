import List "mo:core/List";
import PhotoTypes "types/photos";
import MsgTypes "types/messages";
import PhotosApi "mixins/photos-api";
import MessagesApi "mixins/messages-api";
import AuthApi "mixins/auth-api";
import PhotoLib "lib/photos";
import MsgLib "lib/messages";

actor {
  let photos = List.empty<PhotoTypes.PhotoMeta>();
  let messages = List.empty<MsgTypes.DailyMessage>();

  // Seed on first deploy only (lists are empty on fresh canister)
  if (photos.size() == 0) { PhotoLib.initSampleData(photos) };
  if (messages.size() == 0) { MsgLib.initSampleData(messages) };

  include PhotosApi(photos);
  include MessagesApi(messages);
  include AuthApi();
};
