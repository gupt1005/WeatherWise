const assetPathPrefix = "/assets";
const imgIosSignal = `${assetPathPrefix}/45ff0.svg`;
const imgIosWifiSignal = `${assetPathPrefix}/3f1e3.svg`;
const imgIosBatteryFull = `${assetPathPrefix}/9939f.svg`;
const imgSparkles = `${assetPathPrefix}/861ad.svg`;
const imgMapPin = `${assetPathPrefix}/d76b9.svg`;
const imgThermometer = `${assetPathPrefix}/3bf67.svg`;
const imgThumb = `${assetPathPrefix}/bdafb.svg`;
const imgEnabled = `${assetPathPrefix}/3a105.svg`;
const imgClock = `${assetPathPrefix}/fe989.svg`;
const imgDisabled = `${assetPathPrefix}/295da.svg`;
const imgCloudSun = `${assetPathPrefix}/9098c.svg`;
const imgCloudSun1 = `${assetPathPrefix}/d1224.svg`;
const imgShirt = `${assetPathPrefix}/96544.svg`;
const imgCalendarDays = `${assetPathPrefix}/48cb2.svg`;
const imgSlidersHorizontal = `${assetPathPrefix}/e9592.svg`;

export default function Settings() {
  return (
    <div className="screen next-screen flex flex-col relative w-full min-h-dvh" data-node-id="1:6174" data-name="Settings">
      <div className="contents" data-node-id="1:6175">
        <div className="content-stretch flex flex-col items-start relative w-full flex-1" data-node-id="1:6176" data-name="Screen body">
          
          <div className="content-stretch flex flex-col gap-[9px] items-start overflow-clip pb-[20px] pt-[12px] px-[24px] relative shrink-0 w-full" data-node-id="1:6186" data-name="Page header">
            <div className="content-stretch flex gap-[12px] items-center overflow-clip relative shrink-0 w-full" data-node-id="1:6187" data-name="Title row">
              <p className="[word-break:break-word] flex-[1_0_0] font-['Inter:Bold'] font-bold leading-[1.15] min-w-px not-italic relative text-[#20314f] text-[30px]" data-node-id="1:6188">
                Settings
              </p>
              <div className="relative shrink-0 size-[22px]" data-node-id="1:6189" data-name="sparkles">
                <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgSparkles} />
              </div>
            </div>
            <p className="[word-break:break-word] font-['Inter:Regular'] font-normal leading-[1.5] not-italic relative shrink-0 text-[#68758a] text-[14px] w-full" data-node-id="1:6191">
              Personalize your forecast and outfit reminders.
            </p>
          </div>
          <div className="content-stretch flex flex-col gap-[20px] items-start overflow-clip pb-[24px] px-[24px] relative shrink-0 w-full" data-node-id="1:6192" data-name="Page content">
            <div className="bg-white content-stretch flex flex-col gap-[12px] items-start overflow-clip p-[18px] relative rounded-[22px] shrink-0 w-full" data-node-id="1:6193" data-name="Card">
              <div className="content-stretch flex gap-[12px] items-center overflow-clip relative shrink-0 w-full" data-node-id="1:6194" data-name="Setting row">
                <div className="[word-break:break-word] content-stretch flex flex-[1_0_0] flex-col gap-[3px] items-start leading-[1.5] min-w-px not-italic overflow-clip relative" data-node-id="1:6195" data-name="Labels">
                  <p className="font-['Inter:Semi Bold'] font-semibold relative shrink-0 text-[#20314f] text-[14px] w-full" data-node-id="1:6196">
                    West Lafayette, IN
                  </p>
                  <p className="font-['Inter:Regular'] font-normal relative shrink-0 text-[#68758a] text-[12px] w-full" data-node-id="1:6197">
                    Campus location
                  </p>
                </div>
                <div className="relative shrink-0 size-[19px]" data-node-id="1:6198" data-name="map-pin">
                  <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgMapPin} />
                </div>
              </div>
              <div className="bg-[#dfe5ee] h-px relative shrink-0 w-full" data-node-id="1:6200" data-name="Divider" />
              <div className="content-stretch flex gap-[12px] items-center overflow-clip relative shrink-0 w-full" data-node-id="1:6201" data-name="Setting row">
                <div className="[word-break:break-word] content-stretch flex flex-[1_0_0] flex-col gap-[3px] items-start leading-[1.5] min-w-px not-italic overflow-clip relative" data-node-id="1:6202" data-name="Labels">
                  <p className="font-['Inter:Semi Bold'] font-semibold relative shrink-0 text-[#20314f] text-[14px] w-full" data-node-id="1:6203">
                    Temperature units
                  </p>
                  <p className="font-['Inter:Regular'] font-normal relative shrink-0 text-[#68758a] text-[12px] w-full" data-node-id="1:6204">
                    Used across forecasts and outfits
                  </p>
                </div>
                <div className="relative shrink-0 size-[19px]" data-node-id="1:6205" data-name="thermometer">
                  <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgThermometer} />
                </div>
              </div>
              <div className="bg-[#dfe5ee] content-stretch flex gap-[3px] items-start overflow-clip p-[4px] relative rounded-[14px] shrink-0 w-full" data-node-id="1:6207" data-name="Segmented control">
                <div className="bg-white content-stretch flex flex-[1_0_0] h-[38px] items-center justify-center min-w-px overflow-clip relative rounded-[11px]" data-node-id="1:6208" data-name="Segment">
                  <p className="[word-break:break-word] font-['Inter:Semi Bold'] font-semibold leading-[normal] not-italic relative shrink-0 text-[#6268c8] text-[12px] whitespace-nowrap" data-node-id="1:6209">
                    Fahrenheit °F
                  </p>
                </div>
                <div className="bg-[#dfe5ee] content-stretch flex flex-[1_0_0] h-[38px] items-center justify-center min-w-px overflow-clip relative rounded-[11px]" data-node-id="1:6210" data-name="Segment">
                  <p className="[word-break:break-word] font-['Inter:Semi Bold'] font-semibold leading-[normal] not-italic relative shrink-0 text-[#68758a] text-[12px] whitespace-nowrap" data-node-id="1:6211">
                    Celsius °C
                  </p>
                </div>
              </div>
            </div>
            <div className="content-stretch flex flex-col gap-[12px] items-start overflow-clip relative shrink-0 w-full" data-node-id="1:6212" data-name="Comfort preferences">
              <p className="[word-break:break-word] font-['Inter:Regular'] font-normal leading-[normal] not-italic relative shrink-0 text-[#20314f] text-[17px] w-full" data-node-id="1:6213">
                Comfort
              </p>
              <div className="bg-white content-stretch flex flex-col gap-[12px] items-start overflow-clip p-[18px] relative rounded-[22px] shrink-0 w-full" data-node-id="1:6214" data-name="Card">
                <div className="[word-break:break-word] content-stretch flex items-start justify-between leading-[normal] not-italic overflow-clip relative shrink-0 w-full whitespace-nowrap" data-node-id="1:6215" data-name="Sensitivity heading">
                  <p className="font-['Inter:Semi Bold'] font-semibold relative shrink-0 text-[#20314f] text-[13px]" data-node-id="1:6216">
                    Temperature sensitivity
                  </p>
                  <p className="font-['Inter:Regular'] font-normal relative shrink-0 text-[#6268c8] text-[11px]" data-node-id="1:6217">
                    A little cold
                  </p>
                </div>
                <div className="content-stretch flex flex-col h-[30px] items-start justify-center overflow-clip relative shrink-0 w-full" data-node-id="1:6218" data-name="Sensitivity slider">
                  <div className="bg-[#dfe5ee] h-[5px] relative rounded-[5px] shrink-0 w-full" data-node-id="1:6219" data-name="Track" />
                  <div className="absolute bg-[#6268c8] h-[5px] left-0 rounded-[5px] top-[13px] w-[80px]" data-node-id="1:6220" data-name="Active track" />
                  <div className="absolute left-[72px] size-[24px] top-[3px]" data-node-id="1:6221" data-name="Thumb">
                    <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgThumb} />
                  </div>
                </div>
                <div className="[word-break:break-word] content-stretch flex font-['Inter:Regular'] font-normal items-start justify-between leading-[normal] not-italic overflow-clip relative shrink-0 text-[#68758a] text-[10px] w-full whitespace-nowrap" data-node-id="1:6222" data-name="Slider labels">
                  <p className="relative shrink-0" data-node-id="1:6223">
                    Always cold
                  </p>
                  <p className="relative shrink-0" data-node-id="1:6224">
                    Always warm
                  </p>
                </div>
                <div className="bg-[#dfe5ee] h-px relative shrink-0 w-full" data-node-id="1:6225" data-name="Divider" />
                <p className="[word-break:break-word] font-['Inter:Semi Bold'] font-semibold leading-[1.5] not-italic relative shrink-0 text-[#20314f] text-[12px] w-full" data-node-id="1:6226">
                  Outfit priority
                </p>
                <div className="bg-[#dfe5ee] content-stretch flex gap-[3px] items-start overflow-clip p-[4px] relative rounded-[14px] shrink-0 w-full" data-node-id="1:6227" data-name="Segmented control">
                  <div className="bg-white content-stretch flex flex-[1_0_0] h-[38px] items-center justify-center min-w-px overflow-clip relative rounded-[11px]" data-node-id="1:6228" data-name="Segment">
                    <p className="[word-break:break-word] font-['Inter:Semi Bold'] font-semibold leading-[normal] not-italic relative shrink-0 text-[#6268c8] text-[12px] whitespace-nowrap" data-node-id="1:6229">
                      Comfort
                    </p>
                  </div>
                  <div className="bg-[#dfe5ee] content-stretch flex flex-[1_0_0] h-[38px] items-center justify-center min-w-px overflow-clip relative rounded-[11px]" data-node-id="1:6230" data-name="Segment">
                    <p className="[word-break:break-word] font-['Inter:Semi Bold'] font-semibold leading-[normal] not-italic relative shrink-0 text-[#68758a] text-[12px] whitespace-nowrap" data-node-id="1:6231">
                      Balanced
                    </p>
                  </div>
                  <div className="bg-[#dfe5ee] content-stretch flex flex-[1_0_0] h-[38px] items-center justify-center min-w-px overflow-clip relative rounded-[11px]" data-node-id="1:6232" data-name="Segment">
                    <p className="[word-break:break-word] font-['Inter:Semi Bold'] font-semibold leading-[normal] not-italic relative shrink-0 text-[#68758a] text-[12px] whitespace-nowrap" data-node-id="1:6233">
                      Style
                    </p>
                  </div>
                </div>
                <p className="[word-break:break-word] font-['Inter:Semi Bold'] font-semibold leading-[1.5] not-italic relative shrink-0 text-[#20314f] text-[12px] w-full" data-node-id="1:6234">
                  Recommendation detail
                </p>
                <div className="bg-[#dfe5ee] content-stretch flex gap-[3px] items-start overflow-clip p-[4px] relative rounded-[14px] shrink-0 w-full" data-node-id="1:6235" data-name="Segmented control">
                  <div className="bg-[#dfe5ee] content-stretch flex flex-[1_0_0] h-[38px] items-center justify-center min-w-px overflow-clip relative rounded-[11px]" data-node-id="1:6236" data-name="Segment">
                    <p className="[word-break:break-word] font-['Inter:Semi Bold'] font-semibold leading-[normal] not-italic relative shrink-0 text-[#68758a] text-[12px] whitespace-nowrap" data-node-id="1:6237">
                      Just the basics
                    </p>
                  </div>
                  <div className="bg-white content-stretch flex flex-[1_0_0] h-[38px] items-center justify-center min-w-px overflow-clip relative rounded-[11px]" data-node-id="1:6238" data-name="Segment">
                    <p className="[word-break:break-word] font-['Inter:Semi Bold'] font-semibold leading-[normal] not-italic relative shrink-0 text-[#6268c8] text-[12px] whitespace-nowrap" data-node-id="1:6239">
                      Head to toe
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="content-stretch flex flex-col gap-[12px] items-start overflow-clip relative shrink-0 w-full" data-node-id="1:6240" data-name="Clothing inventory">
              <div className="[word-break:break-word] content-stretch flex font-['Inter:Regular'] font-normal items-start justify-between leading-[normal] not-italic overflow-clip relative shrink-0 w-full whitespace-nowrap" data-node-id="1:6241" data-name="Inventory heading">
                <p className="relative shrink-0 text-[#20314f] text-[17px]" data-node-id="1:6242">
                  Wardrobe
                </p>
                <p className="relative shrink-0 text-[#6268c8] text-[12px]" data-node-id="1:6243">
                  Edit
                </p>
              </div>
              <div className="bg-white content-stretch flex flex-col gap-[12px] items-start overflow-clip p-[18px] relative rounded-[22px] shrink-0 w-full" data-node-id="1:6244" data-name="Card">
                <p className="[word-break:break-word] font-['Inter:Regular'] font-normal leading-[1.5] not-italic relative shrink-0 text-[#68758a] text-[12px] w-full" data-node-id="1:6245">
                  6 categories selected. Tap a category to update.
                </p>
                <div className="content-start flex flex-wrap gap-[7px] items-start overflow-clip relative shrink-0 w-full" data-node-id="1:6246" data-name="Owned clothing categories">
                  <div className="bg-[#6268c8] border border-[#6268c8] border-solid content-stretch flex items-start overflow-clip px-[13px] py-[9px] relative rounded-[99px] shrink-0" data-node-id="1:6247" data-name="Choice">
                    <p className="[word-break:break-word] font-['Inter:Semi Bold'] font-semibold leading-[normal] not-italic relative shrink-0 text-[12px] text-white whitespace-nowrap" data-node-id="1:6248">{`✓ Tops & knits`}</p>
                  </div>
                  <div className="bg-[#6268c8] border border-[#6268c8] border-solid content-stretch flex items-start overflow-clip px-[13px] py-[9px] relative rounded-[99px] shrink-0" data-node-id="1:6249" data-name="Choice">
                    <p className="[word-break:break-word] font-['Inter:Semi Bold'] font-semibold leading-[normal] not-italic relative shrink-0 text-[12px] text-white whitespace-nowrap" data-node-id="1:6250">
                      ✓ Base layers
                    </p>
                  </div>
                  <div className="bg-[#6268c8] border border-[#6268c8] border-solid content-stretch flex items-start overflow-clip px-[13px] py-[9px] relative rounded-[99px] shrink-0" data-node-id="1:6251" data-name="Choice">
                    <p className="[word-break:break-word] font-['Inter:Semi Bold'] font-semibold leading-[normal] not-italic relative shrink-0 text-[12px] text-white whitespace-nowrap" data-node-id="1:6252">{`✓ Coats & jackets`}</p>
                  </div>
                  <div className="bg-[#6268c8] border border-[#6268c8] border-solid content-stretch flex items-start overflow-clip px-[13px] py-[9px] relative rounded-[99px] shrink-0" data-node-id="1:6253" data-name="Choice">
                    <p className="[word-break:break-word] font-['Inter:Semi Bold'] font-semibold leading-[normal] not-italic relative shrink-0 text-[12px] text-white whitespace-nowrap" data-node-id="1:6254">{`✓ Pants & jeans`}</p>
                  </div>
                  <div className="bg-[#6268c8] border border-[#6268c8] border-solid content-stretch flex items-start overflow-clip px-[13px] py-[9px] relative rounded-[99px] shrink-0" data-node-id="1:6255" data-name="Choice">
                    <p className="[word-break:break-word] font-['Inter:Semi Bold'] font-semibold leading-[normal] not-italic relative shrink-0 text-[12px] text-white whitespace-nowrap" data-node-id="1:6256">{`✓ Boots & sneakers`}</p>
                  </div>
                  <div className="bg-[#6268c8] border border-[#6268c8] border-solid content-stretch flex items-start overflow-clip px-[13px] py-[9px] relative rounded-[99px] shrink-0" data-node-id="1:6257" data-name="Choice">
                    <p className="[word-break:break-word] font-['Inter:Semi Bold'] font-semibold leading-[normal] not-italic relative shrink-0 text-[12px] text-white whitespace-nowrap" data-node-id="1:6258">
                      ✓ Accessories
                    </p>
                  </div>
                  <div className="bg-white border border-[#dfe5ee] border-solid content-stretch flex items-start overflow-clip px-[13px] py-[9px] relative rounded-[99px] shrink-0" data-node-id="1:6259" data-name="Choice">
                    <p className="[word-break:break-word] font-['Inter:Semi Bold'] font-semibold leading-[normal] not-italic relative shrink-0 text-[#68758a] text-[12px] whitespace-nowrap" data-node-id="1:6260">
                      + Gym clothing
                    </p>
                  </div>
                  <div className="bg-white border border-[#dfe5ee] border-solid content-stretch flex items-start overflow-clip px-[13px] py-[9px] relative rounded-[99px] shrink-0" data-node-id="1:6261" data-name="Choice">
                    <p className="[word-break:break-word] font-['Inter:Semi Bold'] font-semibold leading-[normal] not-italic relative shrink-0 text-[#68758a] text-[12px] whitespace-nowrap" data-node-id="1:6262">{`+ Dresses & skirts`}</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="content-stretch flex flex-col gap-[12px] items-start overflow-clip relative shrink-0 w-full" data-node-id="1:6263" data-name="Notifications">
              <p className="[word-break:break-word] font-['Inter:Regular'] font-normal leading-[normal] not-italic relative shrink-0 text-[#20314f] text-[17px] w-full" data-node-id="1:6264">
                Notifications
              </p>
              <div className="bg-white content-stretch flex flex-col gap-[12px] items-start overflow-clip p-[18px] relative rounded-[22px] shrink-0 w-full" data-node-id="1:6265" data-name="Card">
                <div className="content-stretch flex gap-[16px] items-center overflow-clip relative shrink-0 w-full" data-node-id="1:6266" data-name="Preference">
                  <div className="[word-break:break-word] content-stretch flex flex-[1_0_0] flex-col gap-[2px] items-start leading-[1.5] min-w-px not-italic overflow-clip relative" data-node-id="1:6267" data-name="Labels">
                    <p className="font-['Inter:Semi Bold'] font-semibold relative shrink-0 text-[#20314f] text-[14px] w-full" data-node-id="1:6268">
                      Morning summary
                    </p>
                    <p className="font-['Inter:Regular'] font-normal relative shrink-0 text-[#68758a] text-[12px] w-full" data-node-id="1:6269">
                      Weather + your outfit before class
                    </p>
                  </div>
                  <div className="h-[26px] relative shrink-0 w-[44px]" data-node-id="1:6270" data-name="Enabled">
                    <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgEnabled} />
                  </div>
                </div>
                <div className="content-stretch flex gap-[12px] items-center overflow-clip relative shrink-0 w-full" data-node-id="1:6272" data-name="Setting row">
                  <div className="[word-break:break-word] content-stretch flex flex-[1_0_0] flex-col gap-[3px] items-start leading-[1.5] min-w-px not-italic overflow-clip relative" data-node-id="1:6273" data-name="Labels">
                    <p className="font-['Inter:Semi Bold'] font-semibold relative shrink-0 text-[#20314f] text-[14px] w-full" data-node-id="1:6274">
                      Summary time
                    </p>
                    <p className="font-['Inter:Regular'] font-normal relative shrink-0 text-[#68758a] text-[12px] w-full" data-node-id="1:6275">
                      7:30 AM · Every day
                    </p>
                  </div>
                  <div className="relative shrink-0 size-[19px]" data-node-id="1:6276" data-name="clock">
                    <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgClock} />
                  </div>
                </div>
                <div className="bg-[#dfe5ee] h-px relative shrink-0 w-full" data-node-id="1:6278" data-name="Divider" />
                <div className="content-stretch flex gap-[16px] items-center overflow-clip relative shrink-0 w-full" data-node-id="1:6279" data-name="Preference">
                  <div className="[word-break:break-word] content-stretch flex flex-[1_0_0] flex-col gap-[2px] items-start leading-[1.5] min-w-px not-italic overflow-clip relative" data-node-id="1:6280" data-name="Labels">
                    <p className="font-['Inter:Semi Bold'] font-semibold relative shrink-0 text-[#20314f] text-[14px] w-full" data-node-id="1:6281">
                      Snow alerts
                    </p>
                    <p className="font-['Inter:Regular'] font-normal relative shrink-0 text-[#68758a] text-[12px] w-full" data-node-id="1:6282">
                      Timing and waterproof layer reminders
                    </p>
                  </div>
                  <div className="h-[26px] relative shrink-0 w-[44px]" data-node-id="1:6283" data-name="Enabled">
                    <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgEnabled} />
                  </div>
                </div>
                <div className="bg-[#dfe5ee] h-px relative shrink-0 w-full" data-node-id="1:6285" data-name="Divider" />
                <div className="content-stretch flex gap-[16px] items-center overflow-clip relative shrink-0 w-full" data-node-id="1:6286" data-name="Preference">
                  <div className="[word-break:break-word] content-stretch flex flex-[1_0_0] flex-col gap-[2px] items-start leading-[1.5] min-w-px not-italic overflow-clip relative" data-node-id="1:6287" data-name="Labels">
                    <p className="font-['Inter:Semi Bold'] font-semibold relative shrink-0 text-[#20314f] text-[14px] w-full" data-node-id="1:6288">
                      Wind chill alerts
                    </p>
                    <p className="font-['Inter:Regular'] font-normal relative shrink-0 text-[#68758a] text-[12px] w-full" data-node-id="1:6289">
                      When the air feels colder
                    </p>
                  </div>
                  <div className="h-[26px] relative shrink-0 w-[44px]" data-node-id="1:6290" data-name="Enabled">
                    <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgEnabled} />
                  </div>
                </div>
                <div className="bg-[#dfe5ee] h-px relative shrink-0 w-full" data-node-id="1:6292" data-name="Divider" />
                <div className="content-stretch flex gap-[16px] items-center overflow-clip relative shrink-0 w-full" data-node-id="1:6293" data-name="Preference">
                  <div className="[word-break:break-word] content-stretch flex flex-[1_0_0] flex-col gap-[2px] items-start leading-[1.5] min-w-px not-italic overflow-clip relative" data-node-id="1:6294" data-name="Labels">
                    <p className="font-['Inter:Semi Bold'] font-semibold relative shrink-0 text-[#20314f] text-[14px] w-full" data-node-id="1:6295">
                      Temperature-drop alerts
                    </p>
                    <p className="font-['Inter:Regular'] font-normal relative shrink-0 text-[#68758a] text-[12px] w-full" data-node-id="1:6296">
                      A heads-up to pack extra warmth
                    </p>
                  </div>
                  <div className="h-[26px] relative shrink-0 w-[44px]" data-node-id="1:6297" data-name="Enabled">
                    <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgEnabled} />
                  </div>
                </div>
                <div className="bg-[#dfe5ee] h-px relative shrink-0 w-full" data-node-id="1:6299" data-name="Divider" />
                <div className="content-stretch flex gap-[16px] items-center overflow-clip relative shrink-0 w-full" data-node-id="1:6300" data-name="Preference">
                  <div className="[word-break:break-word] content-stretch flex flex-[1_0_0] flex-col gap-[2px] items-start leading-[1.5] min-w-px not-italic overflow-clip relative" data-node-id="1:6301" data-name="Labels">
                    <p className="font-['Inter:Semi Bold'] font-semibold relative shrink-0 text-[#20314f] text-[14px] w-full" data-node-id="1:6302">
                      Outfit reminders
                    </p>
                    <p className="font-['Inter:Regular'] font-normal relative shrink-0 text-[#68758a] text-[12px] w-full" data-node-id="1:6303">
                      Remind me after my plans change
                    </p>
                  </div>
                  <div className="h-[26px] relative shrink-0 w-[44px]" data-node-id="1:6304" data-name="Disabled">
                    <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgDisabled} />
                  </div>
                </div>
              </div>
            </div>
            <p className="[word-break:break-word] font-['Inter:Regular'] font-normal leading-[1.5] not-italic relative shrink-0 text-[#68758a] text-[11px] w-full" data-node-id="1:6306">
              Changes save automatically. Notifications follow your device’s quiet hours.
            </p>
            <div className="content-stretch flex gap-[6px] items-start justify-center overflow-clip relative shrink-0 w-full" data-node-id="1:6307" data-name="Brand footer">
              <div className="relative shrink-0 size-[17px]" data-node-id="1:6308" data-name="cloud-sun">
                <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgCloudSun} />
              </div>
              <p className="[word-break:break-word] font-['Inter:Semi Bold'] font-semibold leading-[normal] not-italic relative shrink-0 text-[#68758a] text-[12px] whitespace-nowrap" data-node-id="1:6310">
                WeatherWise · Made for your everyday
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white border-[#dfe5ee] border-solid border-t content-stretch flex gap-[4px] h-[82px] items-start overflow-clip pb-[17px] pt-[10px] px-[16px] relative w-full" data-node-id="1:6311" data-name="Bottom navigation">
          <div className="bg-white content-stretch flex flex-[1_0_0] flex-col gap-[5px] items-center min-w-px overflow-clip p-[5px] relative rounded-[13px]" data-node-id="1:6312" data-name="Tab">
            <div className="relative shrink-0 size-[22px]" data-node-id="1:6313" data-name="cloud-sun">
              <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgCloudSun1} />
            </div>
            <p className="[word-break:break-word] font-['Inter:Medium'] font-medium leading-[normal] not-italic relative shrink-0 text-[#68758a] text-[10px] whitespace-nowrap" data-node-id="1:6315">
              Today
            </p>
          </div>
          <div className="bg-white content-stretch flex flex-[1_0_0] flex-col gap-[5px] items-center min-w-px overflow-clip p-[5px] relative rounded-[13px]" data-node-id="1:6316" data-name="Tab">
            <div className="relative shrink-0 size-[22px]" data-node-id="1:6317" data-name="shirt">
              <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgShirt} />
            </div>
            <p className="[word-break:break-word] font-['Inter:Medium'] font-medium leading-[normal] not-italic relative shrink-0 text-[#68758a] text-[10px] whitespace-nowrap" data-node-id="1:6319">
              Outfit
            </p>
          </div>
          <div className="bg-white content-stretch flex flex-[1_0_0] flex-col gap-[5px] items-center min-w-px overflow-clip p-[5px] relative rounded-[13px]" data-node-id="1:6320" data-name="Tab">
            <div className="relative shrink-0 size-[22px]" data-node-id="1:6321" data-name="calendar-days">
              <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgCalendarDays} />
            </div>
            <p className="[word-break:break-word] font-['Inter:Medium'] font-medium leading-[normal] not-italic relative shrink-0 text-[#68758a] text-[10px] whitespace-nowrap" data-node-id="1:6323">
              Plan
            </p>
          </div>
          <div className="bg-[#e8e9fc] content-stretch flex flex-[1_0_0] flex-col gap-[5px] items-center min-w-px overflow-clip p-[5px] relative rounded-[13px]" data-node-id="1:6324" data-name="Tab">
            <div className="relative shrink-0 size-[22px]" data-node-id="1:6325" data-name="sliders-horizontal">
              <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgSlidersHorizontal} />
            </div>
            <p className="[word-break:break-word] font-['Inter:Bold'] font-bold leading-[normal] not-italic relative shrink-0 text-[#6268c8] text-[10px] whitespace-nowrap" data-node-id="1:6327">
              Settings
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}