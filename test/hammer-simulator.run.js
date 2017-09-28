/**
 * Set touch as Simulator's default action.
 *
 * because pointer cannot act correctly on Simulator (BUG)
 */
Simulator.setType('touch');
Simulator.events.touch.fakeSupport();
