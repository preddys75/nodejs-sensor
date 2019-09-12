'use strict';

var secrets = require('@instana/core').secrets;
var tracing = require('@instana/core').tracing;

var logger;
logger = require('../logger').getLogger('announceCycle/unannounced', function(newLogger) {
  logger = newLogger;
});
var agentConnection = require('../agentConnection');
var agentOpts = require('../agent/opts');
var pidStore = require('../pidStore');

var retryDelay = 60 * 1000;

module.exports = {
  enter: function(ctx) {
    tryToAnnounce(ctx);
  },

  leave: function() {}
};

function tryToAnnounce(ctx) {
  agentConnection.announceNodeCollector(function(err, rawResponse) {
    if (err) {
      logger.info('Announce attempt failed: %s. Will retry in %sms', err.message, retryDelay);
      setTimeout(tryToAnnounce, retryDelay, ctx).unref();
      return;
    }

    var response;
    try {
      response = JSON.parse(rawResponse);
    } catch (e) {
      logger.warn(
        'Failed to JSON.parse agent response. Response was %s. Will retry in %sms',
        rawResponse,
        retryDelay,
        e
      );
      //ADDED -- removed next two lines
      //setTimeout(tryToAnnounce, retryDelay, ctx).unref();
      //return;
    }
    //ADDED   -- removed line below
    //var pid = response.pid;
    var pid = '12345';
    logger.info("%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%\n"
                + "In unannounced.tryToAnnounce\n"
                + `Overwriting pid for reporting purposes to: ${pid}\n`
                + "%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%\n");
    pidStore.pid = pid;

    //ADDED -- removed one line
    //agentOpts.agentUuid = response.agentUuid;
    agentOpts.agentUuid = '9a19de21-3b1d-4da4-8bf8-8e95f4606c9b';
    logger.info("%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%\n"
                + "In unannounced.tryToAnnounce\n"
                + "Set agentOps.agentUuid to 9a19de21-3b1d-4da4-8bf8-8e95f4606c9b\n"
                + "%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%\n");
    //ADDED -- removed entire if
    // if (Array.isArray(response.extraHeaders)) {
    //   tracing.setExtraHttpHeadersToCapture(
    //     response.extraHeaders.map(function(s) {
    //       // Node.js HTTP API turns all incoming HTTP headers into lowercase.
    //       return s.toLowerCase();
    //     })
    //   );
    // }

    //ADDED -- removed entire if statement
    // if (response.secrets) {
    //   if (!(typeof response.secrets.matcher === 'string')) {
    //     logger.warn(
    //       'Received invalid secrets configuration from agent, attribute matcher is not a string: $s',
    //       response.secrets.matcher
    //     );
    //   } else if (Object.keys(secrets.matchers).indexOf(response.secrets.matcher) < 0) {
    //     logger.warn(
    //       'Received invalid secrets configuration from agent, matcher is not supported: $s',
    //       response.secrets.matcher
    //     );
    //   } else if (!Array.isArray(response.secrets.list)) {
    //     logger.warn(
    //       'Received invalid secrets configuration from agent, attribute list is not an array: $s',
    //       response.secrets.list
    //     );
    //   } else {
    //     secrets.setMatcher(response.secrets.matcher, response.secrets.list);
    //   }
    // }

    ctx.transitionTo('announced');
  });
}
