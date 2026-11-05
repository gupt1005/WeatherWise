const assetPathPrefix = "/assets";
const imgIosSignal = `${assetPathPrefix}/45ff0.svg`;
const imgIosWifiSignal = `${assetPathPrefix}/3f1e3.svg`;
const imgIosBatteryFull = `${assetPathPrefix}/9939f.svg`;
const imgArrowLeft = `${assetPathPrefix}/134eb.svg`;
const imgPencil = `${assetPathPrefix}/baa5d.svg`;
const imgClock = `${assetPathPrefix}/b6103.svg`;
const imgMapPin = `${assetPathPrefix}/faf3f.svg`;
const imgChevronDown = `${assetPathPrefix}/be1c6.svg`;
const imgSnowflake = `${assetPathPrefix}/8a38b.svg`;

export default function Group3() {
  return (
    <div className="screen next-screen flex flex-col relative w-full min-h-dvh" data-node-id="1:5466">
      <div className="content-stretch flex flex-col items-start relative w-full" data-node-id="1:5467" data-name="Screen body">
        
        <div className="content-stretch flex flex-col gap-[8px] items-start overflow-clip pb-[16px] pt-[12px] px-[24px] relative shrink-0 w-full" data-node-id="1:5477" data-name="Page header">
          <div className="content-stretch flex gap-[6px] items-center overflow-clip relative shrink-0" data-node-id="1:5478" data-name="Back control">
            <div className="relative shrink-0 size-[20px]" data-node-id="1:5479" data-name="arrow-left">
              <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgArrowLeft} />
            </div>
            <p className="[word-break:break-word] font-['Inter:Semi Bold'] font-semibold leading-[normal] not-italic relative shrink-0 text-[#6268c8] text-[13px] whitespace-nowrap" data-node-id="1:5481">
              Back
            </p>
          </div>
          <div className="[word-break:break-word] content-stretch flex flex-col gap-[4px] h-[59px] items-start not-italic overflow-clip relative shrink-0 w-full" data-node-id="1:5482" data-name="Title row">
            <p className="flex-[1_0_0] font-['Inter:Bold'] font-bold leading-[1.15] min-h-px relative text-[#20314f] text-[30px] w-full" data-node-id="1:5483">
              Edit activity
            </p>
            <p className="font-['Inter:Regular'] font-normal leading-[1.5] relative shrink-0 text-[#68758a] text-[14px] w-full" data-node-id="1:5484">
              Mon, Jan 26
            </p>
          </div>
        </div>
        <div className="content-stretch flex flex-col gap-[16px] items-start overflow-clip pb-[24px] px-[24px] relative shrink-0 w-full" data-node-id="1:5485" data-name="Page content">
          <div className="content-stretch flex flex-col gap-[8px] items-start overflow-clip relative shrink-0 w-full" data-node-id="1:5486" data-name="Form field">
            <p className="[word-break:break-word] font-['Inter:Semi Bold'] font-semibold leading-[1.5] not-italic relative shrink-0 text-[#20314f] text-[13px] w-full" data-node-id="1:5487">
              Activity
            </p>
            <div className="bg-white border border-[#dfe5ee] border-solid content-stretch flex gap-[10px] items-start overflow-clip p-[15px] relative rounded-[14px] shrink-0 w-full" data-node-id="1:5488" data-name="Input">
              <p className="[word-break:break-word] flex-[1_0_0] font-['Inter:Regular'] font-normal leading-[1.5] min-w-px not-italic relative text-[#20314f] text-[14px]" data-node-id="1:5489">
                Study on the terrace
              </p>
              <div className="relative shrink-0 size-[18px]" data-node-id="1:5490" data-name="pencil">
                <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgPencil} />
              </div>
            </div>
          </div>
          <div className="content-stretch flex gap-[12px] items-start overflow-clip relative shrink-0 w-full" data-node-id="1:5492" data-name="Activity time">
            <div className="content-stretch flex flex-[1_0_0] flex-col items-start min-w-px overflow-clip relative" data-node-id="1:5493" data-name="Start">
              <div className="content-stretch flex flex-col gap-[8px] items-start overflow-clip relative shrink-0 w-full" data-node-id="1:5494" data-name="Form field">
                <p className="[word-break:break-word] font-['Inter:Semi Bold'] font-semibold leading-[1.5] not-italic relative shrink-0 text-[#20314f] text-[13px] w-full" data-node-id="1:5495">
                  Start
                </p>
                <div className="bg-white border border-[#dfe5ee] border-solid content-stretch flex gap-[10px] items-start overflow-clip p-[15px] relative rounded-[14px] shrink-0 w-full" data-node-id="1:5496" data-name="Input">
                  <p className="[word-break:break-word] flex-[1_0_0] font-['Inter:Regular'] font-normal leading-[1.5] min-w-px not-italic relative text-[#20314f] text-[14px]" data-node-id="1:5497">
                    4:00 PM
                  </p>
                  <div className="relative shrink-0 size-[18px]" data-node-id="1:5498" data-name="clock">
                    <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgClock} />
                  </div>
                </div>
              </div>
            </div>
            <div className="content-stretch flex flex-[1_0_0] flex-col items-start min-w-px overflow-clip relative" data-node-id="1:5500" data-name="End">
              <div className="content-stretch flex flex-col gap-[8px] items-start overflow-clip relative shrink-0 w-full" data-node-id="1:5501" data-name="Form field">
                <p className="[word-break:break-word] font-['Inter:Semi Bold'] font-semibold leading-[1.5] not-italic relative shrink-0 text-[#20314f] text-[13px] w-full" data-node-id="1:5502">
                  End
                </p>
                <div className="bg-white border border-[#dfe5ee] border-solid content-stretch flex gap-[10px] items-start overflow-clip p-[15px] relative rounded-[14px] shrink-0 w-full" data-node-id="1:5503" data-name="Input">
                  <p className="[word-break:break-word] flex-[1_0_0] font-['Inter:Regular'] font-normal leading-[1.5] min-w-px not-italic relative text-[#20314f] text-[14px]" data-node-id="1:5504">
                    5:30 PM
                  </p>
                  <div className="relative shrink-0 size-[18px]" data-node-id="1:5505" data-name="clock">
                    <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgClock} />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="content-stretch flex flex-col gap-[10px] items-start overflow-clip relative shrink-0 w-full" data-node-id="1:5507" data-name="Environment">
            <p className="[word-break:break-word] font-['Inter:Regular'] font-normal leading-[normal] not-italic relative shrink-0 text-[#20314f] text-[17px] w-full" data-node-id="1:5508">
              Where
            </p>
            <div className="bg-[#dfe5ee] content-stretch flex gap-[3px] items-start overflow-clip p-[4px] relative rounded-[14px] shrink-0 w-full" data-node-id="1:5509" data-name="Segmented control">
              <div className="bg-[#dfe5ee] content-stretch flex flex-[1_0_0] h-[38px] items-center justify-center min-w-px overflow-clip relative rounded-[11px]" data-node-id="1:5510" data-name="Segment">
                <p className="[word-break:break-word] font-['Inter:Semi Bold'] font-semibold leading-[normal] not-italic relative shrink-0 text-[#68758a] text-[12px] whitespace-nowrap" data-node-id="1:5511">
                  Indoors
                </p>
              </div>
              <div className="bg-white content-stretch flex flex-[1_0_0] h-[38px] items-center justify-center min-w-px overflow-clip relative rounded-[11px]" data-node-id="1:5512" data-name="Segment">
                <p className="[word-break:break-word] font-['Inter:Semi Bold'] font-semibold leading-[normal] not-italic relative shrink-0 text-[#6268c8] text-[12px] whitespace-nowrap" data-node-id="1:5513">
                  Outdoors
                </p>
              </div>
            </div>
          </div>
          <div className="content-stretch flex flex-col gap-[8px] items-start overflow-clip relative shrink-0 w-full" data-node-id="1:5514" data-name="Form field">
            <p className="[word-break:break-word] font-['Inter:Semi Bold'] font-semibold leading-[1.5] not-italic relative shrink-0 text-[#20314f] text-[13px] w-full" data-node-id="1:5515">
              Location
            </p>
            <div className="bg-white border border-[#dfe5ee] border-solid content-stretch flex gap-[10px] items-start overflow-clip p-[15px] relative rounded-[14px] shrink-0 w-full" data-node-id="1:5516" data-name="Input">
              <p className="[word-break:break-word] flex-[1_0_0] font-['Inter:Regular'] font-normal leading-[1.5] min-w-px not-italic relative text-[#20314f] text-[14px]" data-node-id="1:5517">
                Hicks Library terrace
              </p>
              <div className="relative shrink-0 size-[18px]" data-node-id="1:5518" data-name="map-pin">
                <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgMapPin} />
              </div>
            </div>
          </div>
          <div className="content-stretch flex flex-col gap-[10px] items-start overflow-clip relative shrink-0 w-full" data-node-id="1:5520" data-name="Transportation">
            <p className="[word-break:break-word] font-['Inter:Regular'] font-normal leading-[normal] not-italic relative shrink-0 text-[#20314f] text-[17px] w-full" data-node-id="1:5521">
              Travel
            </p>
            <div className="content-stretch flex gap-[7px] items-start overflow-clip relative shrink-0 w-full" data-node-id="1:5522" data-name="Transport options">
              <div className="bg-[#6268c8] border border-[#6268c8] border-solid content-stretch flex items-start overflow-clip px-[13px] py-[9px] relative rounded-[99px] shrink-0" data-node-id="1:5523" data-name="Choice">
                <p className="[word-break:break-word] font-['Inter:Semi Bold'] font-semibold leading-[normal] not-italic relative shrink-0 text-[12px] text-white whitespace-nowrap" data-node-id="1:5524">
                  Walk
                </p>
              </div>
              <div className="bg-white border border-[#dfe5ee] border-solid content-stretch flex items-start overflow-clip px-[13px] py-[9px] relative rounded-[99px] shrink-0" data-node-id="1:5525" data-name="Choice">
                <p className="[word-break:break-word] font-['Inter:Semi Bold'] font-semibold leading-[normal] not-italic relative shrink-0 text-[#68758a] text-[12px] whitespace-nowrap" data-node-id="1:5526">
                  Bike
                </p>
              </div>
              <div className="bg-white border border-[#dfe5ee] border-solid content-stretch flex items-start overflow-clip px-[13px] py-[9px] relative rounded-[99px] shrink-0" data-node-id="1:5527" data-name="Choice">
                <p className="[word-break:break-word] font-['Inter:Semi Bold'] font-semibold leading-[normal] not-italic relative shrink-0 text-[#68758a] text-[12px] whitespace-nowrap" data-node-id="1:5528">
                  Bus
                </p>
              </div>
              <div className="bg-white border border-[#dfe5ee] border-solid content-stretch flex items-start overflow-clip px-[13px] py-[9px] relative rounded-[99px] shrink-0" data-node-id="1:5529" data-name="Choice">
                <p className="[word-break:break-word] font-['Inter:Semi Bold'] font-semibold leading-[normal] not-italic relative shrink-0 text-[#68758a] text-[12px] whitespace-nowrap" data-node-id="1:5530">
                  Drive
                </p>
              </div>
            </div>
          </div>
          <div className="content-stretch flex flex-col gap-[8px] items-start overflow-clip relative shrink-0 w-full" data-node-id="1:5531" data-name="Form field">
            <p className="[word-break:break-word] font-['Inter:Semi Bold'] font-semibold leading-[1.5] not-italic relative shrink-0 text-[#20314f] text-[13px] w-full" data-node-id="1:5532">
              Travel time
            </p>
            <div className="bg-white border border-[#dfe5ee] border-solid content-stretch flex gap-[10px] items-start overflow-clip p-[15px] relative rounded-[14px] shrink-0 w-full" data-node-id="1:5533" data-name="Input">
              <p className="[word-break:break-word] flex-[1_0_0] font-['Inter:Regular'] font-normal leading-[1.5] min-w-px not-italic relative text-[#20314f] text-[14px]" data-node-id="1:5534">
                15 min
              </p>
              <div className="relative shrink-0 size-[18px]" data-node-id="1:5535" data-name="chevron-down">
                <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgChevronDown} />
              </div>
            </div>
          </div>
          <div className="bg-[#fff3d5] content-stretch flex gap-[10px] items-start overflow-clip p-[14px] relative rounded-[16px] shrink-0 w-full" data-node-id="1:5537" data-name="Weather note">
            <div className="relative shrink-0 size-[18px]" data-node-id="1:5538" data-name="snowflake">
              <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgSnowflake} />
            </div>
            <p className="[word-break:break-word] flex-[1_0_0] font-['Inter:Regular'] font-normal leading-[1.5] min-w-px not-italic relative text-[#68758a] text-[12px]" data-node-id="1:5540">
              Snow expected. We’ll suggest extra warmth.
            </p>
          </div>
          <div className="bg-[#6268c8] content-stretch flex h-[50px] items-center justify-center overflow-clip relative rounded-[14px] shrink-0 w-full" data-node-id="1:5541" data-name="Action">
            <p className="[word-break:break-word] font-['Inter:Regular'] font-normal leading-[normal] not-italic relative shrink-0 text-[14px] text-white whitespace-nowrap" data-node-id="1:5542">{`Save & update outfit`}</p>
          </div>
          <div className="bg-[#fbeaeb] content-stretch flex h-[50px] items-center justify-center overflow-clip relative rounded-[14px] shrink-0 w-full" data-node-id="1:5543" data-name="Action">
            <p className="[word-break:break-word] font-['Inter:Regular'] font-normal leading-[normal] not-italic relative shrink-0 text-[#b54f50] text-[14px] whitespace-nowrap" data-node-id="1:5544">
              Delete activity
            </p>
          </div>
        </div>
      </div>
      
    </div>
  );
}