'use strict';

const Alexa = require('alexa-sdk');
const APP_ID = undefined;
const handlers = {
  'LaunchRequest': function () {
    const speechOutput = 'ジュース屋さんにようこそ、ご注文をどうぞ';
    this.emit(':ask', speechOutput, speechOutput);
  },
  'OrderJuice': function () {
    var intent = this.event.request.intent;
    const juicetypeSlotField = intent.slots.JuiceType;

    console.log('DUMP:' + JSON.stringify(intent));

    if (juicetypeSlotField.value) {
      const type = juicetypeSlotField.value;
      this.emit(':tell', type + 'ジュースですね。ありがとうございます。よい １ 日を。');
    } else {
      this.emit(':tell', '本日はりんごジュースがおすすめです。よい 1 日を。');
    }
  },
  'AMAZON.HelpIntent': function () {
    const speechOutput = 'ジュース屋さんです。りんご、バナナ、メロンからお選びいただけます。' + '例えば、りんごが飲みたいといってみてください';
    this.emit(':ask', speechOutput, speechOutput);
  },
  'AMAZON.CancelIntent': function () {
    const speechOutput = 'ありがとうございました。またのご来店をお待ちしております。';
    this.emit(':tell', speechOutput);
  },
  'AMAZON.StopIntent': function () {
    const speechOutput = 'ありがとうございました。またのご来店をお待ちしております。';
    this.emit(':tell', speechOutput);
  },
  'Unhandled': function () {
    const speechOutput = 'よくわかりませんでした。もっと勉強しておきます。';
    this.emit(':tell', speechOutput);
  }
};

exports.handler = function (event, context) {
  const alexa = Alexa.handler(event, context);
  alexa.APP_ID = APP_ID;
  alexa.registerHandlers(handlers);
  alexa.execute();
};