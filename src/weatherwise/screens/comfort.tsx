import WeatherWiseLogo from '../WeatherWiseLogo';

const assetPathPrefix = "/assets";
const imgIosSignal = `${assetPathPrefix}/45ff0.svg`;
const imgIosWifiSignal = `${assetPathPrefix}/3f1e3.svg`;
const imgIosBatteryFull = `${assetPathPrefix}/9939f.svg`;
const imgThermometer = `${assetPathPrefix}/6d337.svg`;
const imgSliderThumb = `${assetPathPrefix}/f2871.svg`;

export default function ComfortPersonalizationOnboarding() {
  return (
    <div className="screen bg-[#f3f6fb] flex flex-col items-start justify-between relative w-full min-h-dvh" data-node-id="1:3408" data-name="Comfort personalization onboarding">
      <div className="content-stretch flex flex-col items-start overflow-clip relative shrink-0 w-full" data-node-id="1:3409" data-name="Screen body">
        
        <div className="content-stretch flex flex-col gap-[20px] items-start overflow-clip pb-[24px] px-[24px] relative shrink-0 w-full" data-node-id="1:3419" data-name="Page content">
          <div className="content-stretch flex flex-col gap-[13px] items-start overflow-clip relative shrink-0 w-full" data-node-id="1:3420" data-name="Onboarding progress">
            <div className="[word-break:break-word] content-stretch flex items-center justify-between leading-[normal] not-italic overflow-clip relative shrink-0 w-full whitespace-nowrap" data-node-id="1:3421" data-name="Brand">
              <WeatherWiseLogo />
              <p className="font-['Inter:Regular'] font-normal relative shrink-0 text-[#68758a] text-[12px]" data-node-id="1:3423">
                03 / 04
              </p>
            </div>
            <div className="content-stretch flex gap-[6px] items-start overflow-clip relative shrink-0 w-full" data-node-id="1:3424" data-name="Progress">
              <div className="bg-[#6268c8] flex-[1_0_0] h-[4px] min-w-px relative rounded-[4px]" data-node-id="1:3425" data-name="Progress track" />
              <div className="bg-[#6268c8] flex-[1_0_0] h-[4px] min-w-px relative rounded-[4px]" data-node-id="1:3426" data-name="Progress track" />
              <div className="bg-[#6268c8] flex-[1_0_0] h-[4px] min-w-px relative rounded-[4px]" data-name="Progress track" />
              <div className="bg-[#dfe5ee] flex-[1_0_0] h-[4px] min-w-px relative rounded-[4px]" data-node-id="1:3427" data-name="Progress track" />
            </div>
          </div>
          <div className="content-stretch flex flex-col items-start overflow-clip pt-[16px] relative shrink-0 w-full" data-node-id="1:3428" data-name="Introduction">
            <div className="[word-break:break-word] font-['Inter:Bold'] font-bold leading-[0] not-italic relative shrink-0 text-[#20314f] text-[30px] w-full" data-node-id="1:3429">
              <p className="leading-[1.15] mb-0">Comfort,</p>
              <p className="leading-[1.15]">your way.</p>
            </div>
          </div>
          <div className="bg-white content-stretch flex flex-col gap-[12px] items-start overflow-clip p-[18px] relative rounded-[22px] shrink-0 w-full" data-node-id="1:3430" data-name="Card">
            <div className="content-stretch flex gap-[8px] items-start overflow-clip relative shrink-0 w-full" data-node-id="1:3431" data-name="Sensitivity heading">
              <div className="relative shrink-0 size-[22px]" data-node-id="1:3432" data-name="thermometer">
                <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgThermometer} />
              </div>
              <p className="[word-break:break-word] flex-[1_0_0] font-['Inter:Semi Bold'] font-semibold leading-[normal] min-w-px not-italic relative text-[#20314f] text-[19px]" data-node-id="1:3434">
                Cold Sensitivity
              </p>
            </div>
            <div className="bg-[#e8e9fc] content-stretch flex items-start overflow-clip p-[10px] relative rounded-[12px] shrink-0 w-full" data-node-id="1:3435" data-name="Selection">
              <p className="[word-break:break-word] flex-[1_0_0] font-['Inter:Semi Bold'] font-semibold leading-[1.5] min-w-px not-italic relative text-[#6268c8] text-[14px]" data-node-id="1:3436">
                I run cold
              </p>
            </div>
            <div className="content-stretch flex flex-col h-[32px] items-start justify-center overflow-clip relative shrink-0 w-full" data-node-id="1:3437" data-name="Temperature sensitivity slider">
              <div className="bg-[#dfe5ee] h-[6px] relative rounded-[10px] shrink-0 w-full" data-node-id="1:3438" data-name="Track" />
              <div className="absolute bg-[#6268c8] h-[6px] left-0 rounded-[10px] top-[13px] w-[86px]" data-node-id="1:3439" data-name="Selected range" />
              <div className="absolute left-[77px] size-[24px] top-[4px]" data-node-id="1:3440" data-name="Slider thumb">
                <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgSliderThumb} />
              </div>
            </div>
            <div className="[word-break:break-word] content-stretch flex font-['Inter:Regular'] font-normal items-start justify-between leading-[normal] not-italic overflow-clip relative shrink-0 text-[#68758a] text-[11px] w-full whitespace-nowrap" data-node-id="1:3441" data-name="Range labels">
              <p className="relative shrink-0" data-node-id="1:3442">
                Cold
              </p>
              <p className="relative shrink-0" data-node-id="1:3443">
                Warm
              </p>
            </div>
          </div>
          <div className="content-stretch flex flex-col gap-[12px] items-start overflow-clip relative shrink-0 w-full" data-node-id="1:3444" data-name="Style preference">
            <p className="[word-break:break-word] font-['Inter:Semi Bold'] font-semibold leading-[normal] not-italic relative shrink-0 text-[#20314f] text-[19px] w-full" data-node-id="1:3445">
              Comfort vs Style
            </p>
            <div className="bg-[#dfe5ee] content-stretch flex gap-[3px] items-start overflow-clip p-[4px] relative rounded-[14px] shrink-0 w-full" data-node-id="1:3446" data-name="Segmented control">
              <div className="bg-white content-stretch flex flex-[1_0_0] h-[38px] items-center justify-center min-w-px overflow-clip relative rounded-[11px]" data-node-id="1:3447" data-name="Segment">
                <p className="[word-break:break-word] font-['Inter:Semi Bold'] font-semibold leading-[normal] not-italic relative shrink-0 text-[#6268c8] text-[12px] whitespace-nowrap" data-node-id="1:3448">
                  Comfort
                </p>
              </div>
              <div className="bg-[#dfe5ee] content-stretch flex flex-[1_0_0] h-[38px] items-center justify-center min-w-px overflow-clip relative rounded-[11px]" data-node-id="1:3449" data-name="Segment">
                <p className="[word-break:break-word] font-['Inter:Semi Bold'] font-semibold leading-[normal] not-italic relative shrink-0 text-[#68758a] text-[12px] whitespace-nowrap" data-node-id="1:3450">
                  Balanced
                </p>
              </div>
              <div className="bg-[#dfe5ee] content-stretch flex flex-[1_0_0] h-[38px] items-center justify-center min-w-px overflow-clip relative rounded-[11px]" data-node-id="1:3451" data-name="Segment">
                <p className="[word-break:break-word] font-['Inter:Semi Bold'] font-semibold leading-[normal] not-italic relative shrink-0 text-[#68758a] text-[12px] whitespace-nowrap" data-node-id="1:3452">
                  Style
                </p>
              </div>
            </div>
          </div>
          <div className="content-stretch flex flex-col gap-[12px] items-start overflow-clip relative shrink-0 w-full" data-node-id="1:3453" data-name="Detail preference">
            <p className="[word-break:break-word] font-['Inter:Semi Bold'] font-semibold leading-[normal] not-italic relative shrink-0 text-[#20314f] text-[19px] w-full" data-node-id="1:3454">
              Recommendation Detail
            </p>
            <div className="bg-[#dfe5ee] content-stretch flex gap-[3px] items-start overflow-clip p-[4px] relative rounded-[14px] shrink-0 w-full" data-node-id="1:3455" data-name="Segmented control">
              <div className="bg-[#dfe5ee] content-stretch flex flex-[1_0_0] h-[38px] items-center justify-center min-w-px overflow-clip relative rounded-[11px]" data-node-id="1:3456" data-name="Segment">
                <p className="[word-break:break-word] font-['Inter:Semi Bold'] font-semibold leading-[normal] not-italic relative shrink-0 text-[#68758a] text-[12px] whitespace-nowrap" data-node-id="1:3457">
                  Basics
                </p>
              </div>
              <div className="bg-white content-stretch flex flex-[1_0_0] h-[38px] items-center justify-center min-w-px overflow-clip relative rounded-[11px]" data-node-id="1:3458" data-name="Segment">
                <p className="[word-break:break-word] font-['Inter:Semi Bold'] font-semibold leading-[normal] not-italic relative shrink-0 text-[#6268c8] text-[12px] whitespace-nowrap" data-node-id="1:3459">
                  Head to toe
                </p>
              </div>
            </div>
          </div>
          <div className="bg-[#6268c8] content-stretch flex h-[50px] items-center justify-center overflow-clip relative rounded-[14px] shrink-0 w-full" data-node-id="1:3460" data-name="Action">
            <p className="[word-break:break-word] font-['Inter:Regular'] font-normal leading-[normal] not-italic relative shrink-0 text-[14px] text-white whitespace-nowrap" data-node-id="1:3461">
              Continue
            </p>
          </div>
          <div className="content-stretch flex items-start justify-center overflow-clip relative shrink-0 w-full" data-node-id="1:3462" data-name="Back">
            <p className="[word-break:break-word] font-['Inter:Regular'] font-normal leading-[normal] not-italic relative shrink-0 text-[#6268c8] text-[13px] whitespace-nowrap" data-node-id="1:3463">
              ← Back
            </p>
          </div>
        </div>
      </div>
      
    </div>
  );
}
