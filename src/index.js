import registerClass from './registerClass/registerClass';
import BaseConstructableClass from './component/BaseConstructableClass';
import html from './html/tag';

window.WC = {
  WebComponent: BaseConstructableClass,
  registerClass,
  html,
};
