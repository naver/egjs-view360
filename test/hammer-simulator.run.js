/**
 * Set touch as Simulator's default action.
 *
 * because pointer cannot act correctly on Simulator (BUG)
 */
/* eslint-disable */
Simulator.setType('touch');
Simulator.events.touch.fakeSupport();
/* eslint-enable */
