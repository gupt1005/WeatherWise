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

export default function Group2() {
  return (
    <div className="screen next-screen flex flex-col relative w-full min-h-dvh" data-node-id="1:5547">
      <div className="content-stretch flex flex-col items-start relative w-full" data-node-id="1:5548" data-name="Screen body">
        
        <div className="content-stretch flex flex-col gap-[9px] items-start overflow-clip pb-[20px] pt-[12px] px-[24px] relative shrink-0 w-full" data-node-id="1:5558" data-name="Page header">
          <div className="content-stretch flex gap-[6px] items-center overflow-clip relative shrink-0" data-node-id="1:5559" data-name="Back control">
            <div className="relative shrink-0 size-[20px]" data-node-id="1:5560" data-name="arrow-left">
              <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgArrowLeft} />
            </div>
            <p className="[word-break:break-word] font-['Inter:Semi Bold'] font-semibold leading-[normal] not-italic relative shrink-0 text-[#6268c8] text-[13px] whitespace-nowrap" data-node-id="1:5562">
              Back
            </p>
          </div>
          <div className="content-stretch flex items-center overflow-clip relative shrink-0 w-full" data-node-id="1:5563" data-name="Title row">
            <p className="[word-break:break-word] flex-[1_0_0] font-['Inter:Bold'] font-bold leading-[1.15] min-w-px not-italic relative text-[#20314f] text-[30px]" data-node-id="1:5564">
              Add activity
            </p>
          </div>
          <p className="[word-break:break-word] font-['Inter:Regular'] font-normal leading-[1.5] min-w-full not-italic relative shrink-0 text-[#68758a] text-[14px] w-[min-content]" data-node-id="1:5565">
            Mon, Jan 26
          </p>
        </div>
        <div className="content-stretch flex flex-col gap-[20px] items-start overflow-clip pb-[24px] px-[24px] relative shrink-0 w-full" data-node-id="1:5566" data-name="Page content">
          <div className="content-stretch flex flex-col gap-[8px] items-start overflow-clip relative shrink-0 w-full" data-node-id="1:5567" data-name="Form field">
            <p className="[word-break:break-word] font-['Inter:Semi Bold'] font-semibold leading-[1.5] not-italic relative shrink-0 text-[#20314f] text-[13px] w-full" data-node-id="1:5568">
              Activity
            </p>
            <div className="bg-white border border-[#dfe5ee] border-solid content-stretch flex gap-[10px] items-start overflow-clip p-[15px] relative rounded-[14px] shrink-0 w-full" data-node-id="1:5569" data-name="Input">
              <p className="[word-break:break-word] flex-[1_0_0] font-['Inter:Regular'] font-normal leading-[1.5] min-w-px not-italic relative text-[#20314f] text-[14px]" data-node-id="1:5570">
                Evening walk
              </p>
              <div className="relative shrink-0 size-[18px]" data-node-id="1:5571" data-name="pencil">
                <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgPencil} />
              </div>
            </div>
          </div>
          <div className="content-stretch flex gap-[12px] items-start overflow-clip relative shrink-0 w-full" data-node-id="1:5573" data-name="Activity time">
            <div className="content-stretch flex flex-[1_0_0] flex-col items-start min-w-px overflow-clip relative" data-node-id="1:5574" data-name="Start">
              <div className="content-stretch flex flex-col gap-[8px] items-start overflow-clip relative shrink-0 w-full" data-node-id="1:5575" data-name="Form field">
                <p className="[word-break:break-word] font-['Inter:Semi Bold'] font-semibold leading-[1.5] not-italic relative shrink-0 text-[#20314f] text-[13px] w-full" data-node-id="1:5576">
                  Starts
                </p>
                <div className="bg-white border border-[#dfe5ee] border-solid content-stretch flex gap-[10px] items-start overflow-clip p-[15px] relative rounded-[14px] shrink-0 w-full" data-node-id="1:5577" data-name="Input">
                  <p className="[word-break:break-word] flex-[1_0_0] font-['Inter:Regular'] font-normal leading-[1.5] min-w-px not-italic relative text-[#20314f] text-[14px]" data-node-id="1:5578">
                    6:00 PM
                  </p>
                  <div className="relative shrink-0 size-[18px]" data-node-id="1:5579" data-name="clock">
                    <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgClock} />
                  </div>
                </div>
              </div>
            </div>
            <div className="content-stretch flex flex-[1_0_0] flex-col items-start min-w-px overflow-clip relative" data-node-id="1:5581" data-name="End">
              <div className="content-stretch flex flex-col gap-[8px] items-start overflow-clip relative shrink-0 w-full" data-node-id="1:5582" data-name="Form field">
                <p className="[word-break:break-word] font-['Inter:Semi Bold'] font-semibold leading-[1.5] not-italic relative shrink-0 text-[#20314f] text-[13px] w-full" data-node-id="1:5583">
                  Ends
                </p>
                <div className="bg-white border border-[#dfe5ee] border-solid content-stretch flex gap-[10px] items-start overflow-clip p-[15px] relative rounded-[14px] shrink-0 w-full" data-node-id="1:5584" data-name="Input">
                  <p className="[word-break:break-word] flex-[1_0_0] font-['Inter:Regular'] font-normal leading-[1.5] min-w-px not-italic relative text-[#20314f] text-[14px]" data-node-id="1:5585">
                    6:30 PM
                  </p>
                  <div className="relative shrink-0 size-[18px]" data-node-id="1:5586" data-name="clock">
                    <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgClock} />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="content-stretch flex flex-col gap-[10px] items-start overflow-clip relative shrink-0 w-full" data-node-id="1:5588" data-name="Environment">
            <p className="[word-break:break-word] font-['Inter:Regular'] font-normal leading-[normal] not-italic relative shrink-0 text-[#20314f] text-[17px] w-full" data-node-id="1:5589">
              Location
            </p>
            <div className="bg-[#dfe5ee] content-stretch flex gap-[3px] items-start overflow-clip p-[4px] relative rounded-[14px] shrink-0 w-full" data-node-id="1:5590" data-name="Segmented control">
              <div className="bg-[#dfe5ee] content-stretch flex flex-[1_0_0] h-[38px] items-center justify-center min-w-px overflow-clip relative rounded-[11px]" data-node-id="1:5591" data-name="Segment">
                <p className="[word-break:break-word] font-['Inter:Semi Bold'] font-semibold leading-[normal] not-italic relative shrink-0 text-[#68758a] text-[12px] whitespace-nowrap" data-node-id="1:5592">
                  Indoors
                </p>
              </div>
              <div className="bg-white content-stretch flex flex-[1_0_0] h-[38px] items-center justify-center min-w-px overflow-clip relative rounded-[11px]" data-node-id="1:5593" data-name="Segment">
                <p className="[word-break:break-word] font-['Inter:Semi Bold'] font-semibold leading-[normal] not-italic relative shrink-0 text-[#6268c8] text-[12px] whitespace-nowrap" data-node-id="1:5594">
                  Outdoors
                </p>
              </div>
            </div>
          </div>
          <div className="content-stretch flex flex-col gap-[8px] items-start overflow-clip relative shrink-0 w-full" data-node-id="1:5595" data-name="Form field">
            <p className="[word-break:break-word] font-['Inter:Semi Bold'] font-semibold leading-[1.5] not-italic relative shrink-0 text-[#20314f] text-[13px] w-full" data-node-id="1:5596">
              Where
            </p>
            <div className="bg-white border border-[#dfe5ee] border-solid content-stretch flex gap-[10px] items-start overflow-clip p-[15px] relative rounded-[14px] shrink-0 w-full" data-node-id="1:5597" data-name="Input">
              <p className="[word-break:break-word] flex-[1_0_0] font-['Inter:Regular'] font-normal leading-[1.5] min-w-px not-italic relative text-[#20314f] text-[14px]" data-node-id="1:5598">
                Purdue campus
              </p>
              <div className="relative shrink-0 size-[18px]" data-node-id="1:5599" data-name="map-pin">
                <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgMapPin} />
              </div>
            </div>
          </div>
          <div className="content-stretch flex flex-col gap-[10px] items-start overflow-clip relative shrink-0 w-full" data-node-id="1:5601" data-name="Transportation">
            <p className="[word-break:break-word] font-['Inter:Regular'] font-normal leading-[normal] not-italic relative shrink-0 text-[#20314f] text-[17px] w-full" data-node-id="1:5602">{`How you'll get there`}</p>
            <div className="content-stretch flex gap-[7px] items-start overflow-clip relative shrink-0 w-full" data-node-id="1:5603" data-name="Transport options">
              <div className="bg-[#6268c8] border border-[#6268c8] border-solid content-stretch flex items-start overflow-clip px-[13px] py-[9px] relative rounded-[99px] shrink-0" data-node-id="1:5604" data-name="Choice">
                <p className="[word-break:break-word] font-['Inter:Semi Bold'] font-semibold leading-[normal] not-italic relative shrink-0 text-[12px] text-white whitespace-nowrap" data-node-id="1:5605">
                  Walk
                </p>
              </div>
              <div className="bg-white border border-[#dfe5ee] border-solid content-stretch flex items-start overflow-clip px-[13px] py-[9px] relative rounded-[99px] shrink-0" data-node-id="1:5606" data-name="Choice">
                <p className="[word-break:break-word] font-['Inter:Semi Bold'] font-semibold leading-[normal] not-italic relative shrink-0 text-[#68758a] text-[12px] whitespace-nowrap" data-node-id="1:5607">
                  Bike
                </p>
              </div>
              <div className="bg-white border border-[#dfe5ee] border-solid content-stretch flex items-start overflow-clip px-[13px] py-[9px] relative rounded-[99px] shrink-0" data-node-id="1:5608" data-name="Choice">
                <p className="[word-break:break-word] font-['Inter:Semi Bold'] font-semibold leading-[normal] not-italic relative shrink-0 text-[#68758a] text-[12px] whitespace-nowrap" data-node-id="1:5609">
                  Bus
                </p>
              </div>
              <div className="bg-white border border-[#dfe5ee] border-solid content-stretch flex items-start overflow-clip px-[13px] py-[9px] relative rounded-[99px] shrink-0" data-node-id="1:5610" data-name="Choice">
                <p className="[word-break:break-word] font-['Inter:Semi Bold'] font-semibold leading-[normal] not-italic relative shrink-0 text-[#68758a] text-[12px] whitespace-nowrap" data-node-id="1:5611">
                  Drive
                </p>
              </div>
            </div>
          </div>
          <div className="content-stretch flex flex-col gap-[8px] items-start overflow-clip relative shrink-0 w-full" data-node-id="1:5612" data-name="Form field">
            <p className="[word-break:break-word] font-['Inter:Semi Bold'] font-semibold leading-[1.5] not-italic relative shrink-0 text-[#20314f] text-[13px] w-full" data-node-id="1:5613">
              Travel time outside
            </p>
            <div className="bg-white border border-[#dfe5ee] border-solid content-stretch flex gap-[10px] items-start overflow-clip p-[15px] relative rounded-[14px] shrink-0 w-full" data-node-id="1:5614" data-name="Input">
              <p className="[word-break:break-word] flex-[1_0_0] font-['Inter:Regular'] font-normal leading-[1.5] min-w-px not-italic relative text-[#20314f] text-[14px]" data-node-id="1:5615">
                15 min
              </p>
              <div className="relative shrink-0 size-[18px]" data-node-id="1:5616" data-name="chevron-down">
                <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgChevronDown} />
              </div>
            </div>
          </div>
          <div className="bg-[#fff3d5] content-stretch flex gap-[10px] items-start overflow-clip p-[14px] relative rounded-[16px] shrink-0 w-full" data-node-id="1:5618" data-name="Weather note">
            <div className="relative shrink-0 size-[18px]" data-node-id="1:5619" data-name="snowflake">
              <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgSnowflake} />
            </div>
            <p className="[word-break:break-word] flex-[1_0_0] font-['Inter:Regular'] font-normal leading-[1.5] min-w-px not-italic relative text-[#68758a] text-[12px]" data-node-id="1:5621">
              Snow and wind chill expected. Cover hands and ears.
            </p>
          </div>
          <div className="bg-[#6268c8] content-stretch flex h-[50px] items-center justify-center overflow-clip relative rounded-[14px] shrink-0 w-full" data-node-id="1:5622" data-name="Action">
            <p className="[word-break:break-word] font-['Inter:Regular'] font-normal leading-[normal] not-italic relative shrink-0 text-[14px] text-white whitespace-nowrap" data-node-id="1:5623">{`Save & update outfit`}</p>
          </div>
          <div className="bg-[#e8e9fc] content-stretch flex h-[50px] items-center justify-center overflow-clip relative rounded-[14px] shrink-0 w-full" data-node-id="1:5624" data-name="Action">
            <p className="[word-break:break-word] font-['Inter:Regular'] font-normal leading-[normal] not-italic relative shrink-0 text-[#6268c8] text-[14px] whitespace-nowrap" data-node-id="1:5625">
              Cancel
            </p>
          </div>
        </div>
      </div>
      
    </div>
  );
}