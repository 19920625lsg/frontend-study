import { CommonUilibModule } from './common-uilib.module';

describe('CommonUilibModule', () => {
  let commonUilibModule: CommonUilibModule;

  beforeEach(() => {
    commonUilibModule = new CommonUilibModule();
  });

  it('should create an instance', () => {
    expect(commonUilibModule).toBeTruthy();
  });
});
