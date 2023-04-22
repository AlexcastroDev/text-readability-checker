import TextReadabilityChecker from '../dist/index.js';
import tap from 'tap';

tap.test('isReadable', (t) => {
  t.plan(1);
  const checker = new TextReadabilityChecker('This is easy to read.', 16, '#ffffff', '#000000')
  t.equal(checker.isReadable(), true);
})

tap.test('isReadable', (t) => {
  t.plan(1);
  const checker = new TextReadabilityChecker('This is hard to read.', 16, '#ff00ff', '#00ff00');
  t.equal(checker.isReadable(), false);
})
