const assetPathPrefix = "/assets";
const imgIosSignal = `${assetPathPrefix}/45ff0.svg`;
const imgIosWifiSignal = `${assetPathPrefix}/3f1e3.svg`;
const imgIosBatteryFull = `${assetPathPrefix}/9939f.svg`;
const imgArrowLeft = `${assetPathPrefix}/134eb.svg`;
const imgCloudSnow = `${assetPathPrefix}/e4e8d.svg`;
const imgCheck = `${assetPathPrefix}/c0722.svg`;
const imgFootprints = `${assetPathPrefix}/4af29.svg`;
const imgHand = `${assetPathPrefix}/3c733.svg`;
const imgDisabled = `${assetPathPrefix}/295da.svg`;

export default function Group12() {
  return (
    <div className="screen next-screen flex flex-col relative w-full min-h-dvh" data-node-id="1:6098">
      <div className="content-stretch flex flex-col items-start relative w-full" data-node-id="1:6099" data-name="Screen body">
        
        <div className="content-stretch flex flex-col gap-[9px] items-start overflow-clip pb-[20px] pt-[12px] px-[24px] relative shrink-0 w-full" data-node-id="1:6109" data-name="Page header">
          <div className="content-stretch flex gap-[6px] items-center overflow-clip relative shrink-0" data-node-id="1:6110" data-name="Back control">
            <div className="relative shrink-0 size-[20px]" data-node-id="1:6111" data-name="arrow-left">
              <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgArrowLeft} />
            </div>
            <p className="[word-break:break-word] font-['Inter:Semi Bold'] font-semibold leading-[normal] not-italic relative shrink-0 text-[#6268c8] text-[13px] whitespace-nowrap" data-node-id="1:6113">
              Back
            </p>
          </div>
          <div className="content-stretch flex items-center overflow-clip relative shrink-0 w-full" data-node-id="1:6114" data-name="Title row">
            <p className="[word-break:break-word] flex-[1_0_0] font-['Inter:Bold'] font-bold leading-[1.15] min-w-px not-italic relative text-[#20314f] text-[30px]" data-node-id="1:6115">
              Snow is on its way.
            </p>
          </div>
          <p className="[word-break:break-word] font-['Inter:Regular'] font-normal leading-[1.5] min-w-full not-italic relative shrink-0 text-[#68758a] text-[14px] w-[min-content]" data-node-id="1:6116">
            West Lafayette, IN · Jan 26
          </p>
        </div>
        <div className="content-stretch flex flex-col gap-[20px] items-start overflow-clip pb-[24px] px-[24px] relative shrink-0 w-full" data-node-id="1:6117" data-name="Page content">
          <div className="bg-[#e8e9fc] content-stretch flex flex-col gap-[14px] items-start overflow-clip p-[24px] relative rounded-[24px] shrink-0 w-full" data-node-id="1:6118" data-name="Snow forecast">
            <div className="content-stretch flex items-center justify-between overflow-clip relative shrink-0 w-full" data-node-id="1:6119" data-name="Snow timing">
              <div className="[word-break:break-word] content-stretch flex flex-col gap-[6px] items-start not-italic overflow-clip relative shrink-0 text-[#20314f]" data-node-id="1:6120" data-name="Forecast summary">
                <p className="font-['Inter:Bold'] font-bold leading-[normal] relative shrink-0 text-[32px] whitespace-nowrap" data-node-id="1:6121">
                  3–7 PM
                </p>
                <p className="font-['Inter:Regular'] font-normal leading-[1.5] min-w-full relative shrink-0 text-[14px] w-[min-content]" data-node-id="1:6122">
                  Light snow · 1–2 in
                </p>
              </div>
              <div className="relative shrink-0 size-[58px]" data-node-id="1:6123" data-name="cloud-snow">
                <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgCloudSnow} />
              </div>
            </div>
            <p className="[word-break:break-word] font-['Inter:Regular'] font-normal leading-[1.5] not-italic relative shrink-0 text-[#68758a] text-[12px] w-full" data-node-id="1:6125">
              Feels like 22°F at 4 PM. Sidewalks may become slick.
            </p>
          </div>
          <div className="content-stretch flex flex-col gap-[15px] items-start overflow-clip relative shrink-0 w-full" data-node-id="1:6126" data-name="Actionable guidance">
            <p className="[word-break:break-word] font-['Inter:Regular'] font-normal leading-[normal] not-italic relative shrink-0 text-[#20314f] text-[17px] w-full" data-node-id="1:6127">
              Quick safety checks
            </p>
            <div className="content-stretch flex gap-[12px] items-start overflow-clip relative shrink-0 w-full" data-node-id="1:6128" data-name="Guidance item">
              <div className="relative shrink-0 size-[20px]" data-node-id="1:6129" data-name="check">
                <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgCheck} />
              </div>
              <div className="[word-break:break-word] content-stretch flex flex-[1_0_0] flex-col gap-[4px] items-start leading-[1.5] min-w-px not-italic overflow-clip relative" data-node-id="1:6131" data-name="Guidance copy">
                <p className="font-['Inter:Semi Bold'] font-semibold relative shrink-0 text-[#20314f] text-[14px] w-full" data-node-id="1:6132">
                  Before 3 PM
                </p>
                <p className="font-['Inter:Regular'] font-normal relative shrink-0 text-[#68758a] text-[12px] w-full" data-node-id="1:6133">
                  Wear a waterproof parka.
                </p>
              </div>
            </div>
            <div className="content-stretch flex gap-[12px] items-start overflow-clip relative shrink-0 w-full" data-node-id="1:6134" data-name="Guidance item">
              <div className="relative shrink-0 size-[20px]" data-node-id="1:6135" data-name="footprints">
                <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgFootprints} />
              </div>
              <div className="[word-break:break-word] content-stretch flex flex-[1_0_0] flex-col gap-[4px] items-start leading-[1.5] min-w-px not-italic overflow-clip relative" data-node-id="1:6137" data-name="Guidance copy">
                <p className="font-['Inter:Semi Bold'] font-semibold relative shrink-0 text-[#20314f] text-[14px] w-full" data-node-id="1:6138">
                  Footwear
                </p>
                <p className="font-['Inter:Regular'] font-normal relative shrink-0 text-[#68758a] text-[12px] w-full" data-node-id="1:6139">
                  Wear waterproof boots with grip.
                </p>
              </div>
            </div>
            <div className="content-stretch flex gap-[12px] items-start overflow-clip relative shrink-0 w-full" data-node-id="1:6140" data-name="Guidance item">
              <div className="relative shrink-0 size-[20px]" data-node-id="1:6141" data-name="hand">
                <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgHand} />
              </div>
              <div className="[word-break:break-word] content-stretch flex flex-[1_0_0] flex-col gap-[4px] items-start leading-[1.5] min-w-px not-italic overflow-clip relative" data-node-id="1:6143" data-name="Guidance copy">
                <p className="font-['Inter:Semi Bold'] font-semibold relative shrink-0 text-[#20314f] text-[14px] w-full" data-node-id="1:6144">
                  Heading home
                </p>
                <p className="font-['Inter:Regular'] font-normal relative shrink-0 text-[#68758a] text-[12px] w-full" data-node-id="1:6145">
                  Add gloves and a scarf. Leave extra time for campus paths.
                </p>
              </div>
            </div>
          </div>
          <div className="bg-[#6268c8] content-stretch flex h-[50px] items-center justify-center overflow-clip relative rounded-[14px] shrink-0 w-full" data-node-id="1:6146" data-name="Action">
            <p className="[word-break:break-word] font-['Inter:Regular'] font-normal leading-[normal] not-italic relative shrink-0 text-[14px] text-white whitespace-nowrap" data-node-id="1:6147">
              See outfit →
            </p>
          </div>
          <div className="bg-white content-stretch flex flex-col gap-[12px] items-start overflow-clip p-[18px] relative rounded-[22px] shrink-0 w-full" data-node-id="1:6148" data-name="Card">
            <div className="content-stretch flex gap-[16px] items-center overflow-clip relative shrink-0 w-full" data-node-id="1:6149" data-name="Preference">
              <div className="[word-break:break-word] content-stretch flex flex-[1_0_0] flex-col gap-[2px] items-start leading-[1.5] min-w-px not-italic overflow-clip relative" data-node-id="1:6150" data-name="Labels">
                <p className="font-['Inter:Semi Bold'] font-semibold relative shrink-0 text-[#20314f] text-[14px] w-full" data-node-id="1:6151">
                  Mute snow alerts
                </p>
                <p className="font-['Inter:Regular'] font-normal relative shrink-0 text-[#68758a] text-[12px] w-full" data-node-id="1:6152">
                  Pause snow notifications only.
                </p>
              </div>
              <div className="h-[26px] relative shrink-0 w-[44px]" data-node-id="1:6153" data-name="Disabled">
                <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgDisabled} />
              </div>
            </div>
            <div className="bg-[#dfe5ee] h-px relative shrink-0 w-full" data-node-id="1:6155" data-name="Divider" />
            <p className="[word-break:break-word] font-['Inter:Regular'] font-normal leading-[1.5] not-italic relative shrink-0 text-[#68758a] text-[11px] w-full" data-node-id="1:6156">
              Wind chill and temperature-drop alerts stay on. Restore in Settings.
            </p>
          </div>
          <p className="[word-break:break-word] font-['Inter:Regular'] font-normal leading-[1.5] not-italic relative shrink-0 text-[#68758a] text-[10px] w-full" data-node-id="1:6157">
            Updated 8:30 AM. Check campus travel advisories.
          </p>
        </div>
      </div>
      
    </div>
  );
}