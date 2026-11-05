const assetPathPrefix = "/assets";
const imgIosSignal = `${assetPathPrefix}/45ff0.svg`;
const imgIosWifiSignal = `${assetPathPrefix}/3f1e3.svg`;
const imgIosBatteryFull = `${assetPathPrefix}/9939f.svg`;
const imgArrowLeft = `${assetPathPrefix}/134eb.svg`;
const imgSnowflake = `${assetPathPrefix}/a3d2e.svg`;
const imgChevronRight = `${assetPathPrefix}/23b84.svg`;
const imgBellOff = `${assetPathPrefix}/1fff9.svg`;
const imgWind = `${assetPathPrefix}/cdba2.svg`;
const imgThermometerSnowflake = `${assetPathPrefix}/bfd8d.svg`;

export default function Group5() {
  return (
    <div className="screen next-screen flex flex-col relative w-full min-h-dvh" data-node-id="1:5292">
      <div className="content-stretch flex flex-col items-start relative w-full" data-node-id="1:5293" data-name="Screen body">
        
        <div className="content-stretch flex flex-col gap-[9px] items-start overflow-clip pb-[20px] pt-[12px] px-[24px] relative shrink-0 w-full" data-node-id="1:5303" data-name="Page header">
          <div className="content-stretch flex gap-[6px] items-center overflow-clip relative shrink-0" data-node-id="1:5304" data-name="Back control">
            <div className="relative shrink-0 size-[20px]" data-node-id="1:5305" data-name="arrow-left">
              <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgArrowLeft} />
            </div>
            <p className="[word-break:break-word] font-['Inter:Semi Bold'] font-semibold leading-[normal] not-italic relative shrink-0 text-[#6268c8] text-[13px] whitespace-nowrap" data-node-id="1:5307">
              Back
            </p>
          </div>
          <div className="content-stretch flex items-center overflow-clip relative shrink-0 w-full" data-node-id="1:5308" data-name="Title row">
            <p className="[word-break:break-word] flex-[1_0_0] font-['Inter:Bold'] font-bold leading-[1.15] min-w-px not-italic relative text-[#20314f] text-[30px]" data-node-id="1:5309">
              Today’s alerts
            </p>
          </div>
          <p className="[word-break:break-word] font-['Inter:Regular'] font-normal leading-[1.5] min-w-full not-italic relative shrink-0 text-[#68758a] text-[14px] w-[min-content]" data-node-id="1:5310">
            3 active alerts · West Lafayette, IN
          </p>
        </div>
        <div className="content-stretch flex flex-col gap-[20px] items-start overflow-clip pb-[24px] px-[24px] relative shrink-0 w-full" data-node-id="1:5311" data-name="Page content">
          <div className="bg-[#fff3d5] content-stretch flex flex-col gap-[12px] items-start overflow-clip p-[18px] relative rounded-[22px] shrink-0 w-full" data-node-id="1:5312" data-name="Card">
            <div className="content-stretch flex gap-[10px] items-start overflow-clip relative shrink-0 w-full" data-node-id="1:5313" data-name="Alert title">
              <div className="relative shrink-0 size-[22px]" data-node-id="1:5314" data-name="snowflake">
                <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgSnowflake} />
              </div>
              <p className="[word-break:break-word] flex-[1_0_0] font-['Inter:Regular'] font-normal leading-[normal] min-w-px not-italic relative text-[#20314f] text-[17px]" data-node-id="1:5316">
                Snow after 3 PM
              </p>
            </div>
            <p className="[word-break:break-word] font-['Inter:Semi Bold'] font-semibold leading-[1.5] not-italic relative shrink-0 text-[#68758a] text-[11px] w-full" data-node-id="1:5317">
              3–7 PM · 1–2 in.
            </p>
            <p className="[word-break:break-word] font-['Inter:Regular'] font-normal leading-[1.5] not-italic relative shrink-0 text-[#68758a] text-[13px] w-full" data-node-id="1:5318">
              Wear boots and a parka for the walk home.
            </p>
            <div className="content-stretch flex items-start justify-between overflow-clip relative shrink-0 w-full" data-node-id="1:5319" data-name="Alert actions">
              <p className="[word-break:break-word] font-['Inter:Regular'] font-normal leading-[normal] not-italic relative shrink-0 text-[#6268c8] text-[12px] whitespace-nowrap" data-node-id="1:5320">
                Details →
              </p>
              <div className="relative shrink-0 size-[16px]" data-node-id="1:5321" data-name="chevron-right">
                <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgChevronRight} />
              </div>
            </div>
            <div className="bg-[#dfe5ee] h-px relative shrink-0 w-full" data-node-id="1:5323" data-name="Divider" />
            <div className="content-stretch flex gap-[6px] items-center overflow-clip relative shrink-0 w-full" data-node-id="1:5324" data-name="Mute type">
              <div className="relative shrink-0 size-[14px]" data-node-id="1:5325" data-name="bell-off">
                <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgBellOff} />
              </div>
              <p className="[word-break:break-word] flex-[1_0_0] font-['Inter:Regular'] font-normal leading-[1.5] min-w-px not-italic relative text-[#68758a] text-[11px]" data-node-id="1:5327">
                Mute snow alerts
              </p>
            </div>
          </div>
          <div className="bg-white content-stretch flex flex-col gap-[12px] items-start overflow-clip p-[18px] relative rounded-[22px] shrink-0 w-full" data-node-id="1:5328" data-name="Card">
            <div className="content-stretch flex gap-[10px] items-start overflow-clip relative shrink-0 w-full" data-node-id="1:5329" data-name="Alert title">
              <div className="relative shrink-0 size-[22px]" data-node-id="1:5330" data-name="wind">
                <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgWind} />
              </div>
              <p className="[word-break:break-word] flex-[1_0_0] font-['Inter:Regular'] font-normal leading-[normal] min-w-px not-italic relative text-[#20314f] text-[17px]" data-node-id="1:5332">
                Wind chill on campus
              </p>
            </div>
            <p className="[word-break:break-word] font-['Inter:Semi Bold'] font-semibold leading-[1.5] not-italic relative shrink-0 text-[#68758a] text-[11px] w-full" data-node-id="1:5333">
              Now–noon · Feels like 26°F
            </p>
            <p className="[word-break:break-word] font-['Inter:Regular'] font-normal leading-[1.5] not-italic relative shrink-0 text-[#68758a] text-[13px] w-full" data-node-id="1:5334">
              Wear a scarf and beanie between buildings.
            </p>
            <div className="content-stretch flex items-start justify-between overflow-clip relative shrink-0 w-full" data-node-id="1:5335" data-name="Alert actions">
              <p className="[word-break:break-word] font-['Inter:Regular'] font-normal leading-[normal] not-italic relative shrink-0 text-[#6268c8] text-[12px] whitespace-nowrap" data-node-id="1:5336">
                Details →
              </p>
              <div className="relative shrink-0 size-[16px]" data-node-id="1:5337" data-name="chevron-right">
                <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgChevronRight} />
              </div>
            </div>
            <div className="bg-[#dfe5ee] h-px relative shrink-0 w-full" data-node-id="1:5339" data-name="Divider" />
            <div className="content-stretch flex gap-[6px] items-center overflow-clip relative shrink-0 w-full" data-node-id="1:5340" data-name="Mute type">
              <div className="relative shrink-0 size-[14px]" data-node-id="1:5341" data-name="bell-off">
                <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgBellOff} />
              </div>
              <p className="[word-break:break-word] flex-[1_0_0] font-['Inter:Regular'] font-normal leading-[1.5] min-w-px not-italic relative text-[#68758a] text-[11px]" data-node-id="1:5343">
                Mute wind chill alerts
              </p>
            </div>
          </div>
          <div className="bg-white content-stretch flex flex-col gap-[12px] items-start overflow-clip p-[18px] relative rounded-[22px] shrink-0 w-full" data-node-id="1:5344" data-name="Card">
            <div className="content-stretch flex gap-[10px] items-start overflow-clip relative shrink-0 w-full" data-node-id="1:5345" data-name="Alert title">
              <div className="relative shrink-0 size-[22px]" data-node-id="1:5346" data-name="thermometer-snowflake">
                <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgThermometerSnowflake} />
              </div>
              <p className="[word-break:break-word] flex-[1_0_0] font-['Inter:Regular'] font-normal leading-[normal] min-w-px not-italic relative text-[#20314f] text-[17px]" data-node-id="1:5348">
                Colder evening ahead
              </p>
            </div>
            <p className="[word-break:break-word] font-['Inter:Semi Bold'] font-semibold leading-[1.5] not-italic relative shrink-0 text-[#68758a] text-[11px] w-full" data-node-id="1:5349">
              5–9 PM · Feels like 20°F
            </p>
            <p className="[word-break:break-word] font-['Inter:Regular'] font-normal leading-[1.5] not-italic relative shrink-0 text-[#68758a] text-[13px] w-full" data-node-id="1:5350">
              Bring gloves if you stay late.
            </p>
            <div className="content-stretch flex items-start justify-between overflow-clip relative shrink-0 w-full" data-node-id="1:5351" data-name="Alert actions">
              <p className="[word-break:break-word] font-['Inter:Regular'] font-normal leading-[normal] not-italic relative shrink-0 text-[#6268c8] text-[12px] whitespace-nowrap" data-node-id="1:5352">
                Details →
              </p>
              <div className="relative shrink-0 size-[16px]" data-node-id="1:5353" data-name="chevron-right">
                <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgChevronRight} />
              </div>
            </div>
            <div className="bg-[#dfe5ee] h-px relative shrink-0 w-full" data-node-id="1:5355" data-name="Divider" />
            <div className="content-stretch flex gap-[6px] items-center overflow-clip relative shrink-0 w-full" data-node-id="1:5356" data-name="Mute type">
              <div className="relative shrink-0 size-[14px]" data-node-id="1:5357" data-name="bell-off">
                <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgBellOff} />
              </div>
              <p className="[word-break:break-word] flex-[1_0_0] font-['Inter:Regular'] font-normal leading-[1.5] min-w-px not-italic relative text-[#68758a] text-[11px]" data-node-id="1:5359">
                Mute temperature-drop alerts
              </p>
            </div>
          </div>
          <p className="[word-break:break-word] font-['Inter:Regular'] font-normal leading-[1.5] not-italic relative shrink-0 text-[#68758a] text-[11px] w-full" data-node-id="1:5360">
            Updated 8:30 AM · Muting a type pauses its notifications, not the forecast.
          </p>
        </div>
      </div>
      
    </div>
  );
}