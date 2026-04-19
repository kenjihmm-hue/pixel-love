import List "mo:core/List";
import Types "../types/messages";

module {
  let romanceMessages : [Text] = [
    "Every moment with you is a pixel in our perfect picture. 💕",
    "You're my favourite notification, my forever tab open. 🌸",
    "Together we're main characters in the best story ever written. ✨",
    "You make every ordinary day extraordinary. 💫",
    "Loving you is the easiest thing I've ever done. 🌹",
    "Home is wherever I'm with you. 🏡",
    "You had me at 'candybara'. 🦋",
  ];

  public func getDailyMessage(messages : List.List<Types.DailyMessage>, dayOfWeek : Nat) : Text {
    // If the list has been populated with custom messages, use those
    let size = messages.size();
    if (size > 0) {
      let idx = dayOfWeek % size;
      let msg = messages.at(idx);
      msg.text;
    } else {
      romanceMessages[dayOfWeek % 7];
    };
  };

  public func initSampleData(messages : List.List<Types.DailyMessage>) {
    for (text in romanceMessages.values()) {
      messages.add({ text });
    };
  };
};
