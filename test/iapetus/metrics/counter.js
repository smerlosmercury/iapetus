// @flow

import test from 'ava';
import getPort from 'get-port';
import {
  assertCounterMetricValue
} from '../../helpers';
import createIapetus from '../../../src/factories/createIapetus';

test('increment() increments metric', async (t) => {
  const port = await getPort();
  const iapetus = createIapetus({
    port
  });

  const fooCounter = iapetus.createCounterMetric({
    description: 'foo',
    name: 'foo'
  });

  assertCounterMetricValue(t, iapetus, 'foo', 0);

  fooCounter.increment();

  assertCounterMetricValue(t, iapetus, 'foo', 1);

  await iapetus.stop();
});