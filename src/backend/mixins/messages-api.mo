import List "mo:core/List";
import MsgTypes "../types/messages";
import MsgLib "../lib/messages";
import Time "mo:core/Time";
import Int "mo:core/Int";

mixin (messages : List.List<MsgTypes.DailyMessage>) {
  public query func getDailyMessage() : async Text {
    // Day of week derived from current time: seconds since epoch / 86400 % 7
    let nowSec : Int = Time.now() / 1_000_000_000;
    let dayOfWeek : Nat = Int.abs(nowSec / 86400) % 7;
    MsgLib.getDailyMessage(messages, dayOfWeek);
  };
};
