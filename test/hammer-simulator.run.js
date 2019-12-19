/**
 * Set touch as Simulator's default action.
 *
 * because pointer cannot act correctly on Simulator (BUG)
 */
/* eslint-disable */
Simulator.setType('pointer');
Simulator.events.touch.fakeSupport();
Simulator.events.pointer.fakeSupport();
/* eslint-enable */
