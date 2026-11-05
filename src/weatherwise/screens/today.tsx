const assetPathPrefix = "/assets";
const imgIosSignal = `${assetPathPrefix}/45ff0.svg`;
const imgIosWifiSignal = `${assetPathPrefix}/3f1e3.svg`;
const imgIosBatteryFull = `${assetPathPrefix}/9939f.svg`;
const imgBell = `${assetPathPrefix}/237d9.svg`;
const imgCloudSnow = `${assetPathPrefix}/4c70e.svg`;
const imgSnowflake = `${assetPathPrefix}/df07e.svg`;
const imgChevronRight = `${assetPathPrefix}/70b4a.svg`;
const imgCloud = `${assetPathPrefix}/cb057.svg`;
const imgCloudSnow1 = `${assetPathPrefix}/f70ae.svg`;
const imgSnowflake1 = `${assetPathPrefix}/95ed1.svg`;
const imgClothingIllustration = `${assetPathPrefix}/f3f2c.svg`;
const imgClothingIllustration1 = `${assetPathPrefix}/2f974.svg`;
const imgClothingIllustration2 = `${assetPathPrefix}/7a066.svg`;
const imgClothingIllustration3 = `${assetPathPrefix}/1b412.svg`;
const imgClothingIllustration4 = `${assetPathPrefix}/5a70b.svg`;
const imgClothingIllustration5 = `${assetPathPrefix}/c0986.svg`;
const imgClothingIllustration6 = `${assetPathPrefix}/48d11.svg`;
const imgSparkles = `${assetPathPrefix}/861ad.svg`;
const imgCalendarDays = `${assetPathPrefix}/a6084.svg`;
const imgCloudSun = `${assetPathPrefix}/082b6.svg`;
const imgShirt = `${assetPathPrefix}/96544.svg`;
const imgCalendarDays1 = `${assetPathPrefix}/48cb2.svg`;
const imgSlidersHorizontal = `${assetPathPrefix}/36aa1.svg`;

export default function Today() {
  return (
    <div className="screen bg-[#f3f6fb] flex flex-col items-start justify-between relative w-full min-h-dvh" data-node-id="1:3211" data-name="Today">
      <div className="content-stretch flex flex-col items-start overflow-clip relative shrink-0 w-full" data-node-id="1:3212" data-name="Screen body">
        
        <div className="content-stretch flex flex-col gap-[9px] items-start overflow-clip pb-[20px] pt-[12px] px-[24px] relative shrink-0 w-full" data-node-id="1:3222" data-name="Page header">
          <div className="content-stretch flex gap-[12px] items-center overflow-clip relative shrink-0 w-full" data-node-id="1:3223" data-name="Title row">
            <p className="[word-break:break-word] flex-[1_0_0] font-['Inter:Bold'] font-bold leading-[1.15] min-w-px not-italic relative text-[#20314f] text-[30px]" data-node-id="1:3224">
              Morning, Alex.
            </p>
            <div className="relative shrink-0 size-[22px]" data-node-id="1:3225" data-name="bell">
              <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgBell} />
            </div>
          </div>
          <p className="[word-break:break-word] font-['Inter:Regular'] font-normal leading-[1.5] not-italic relative shrink-0 text-[#68758a] text-[14px] w-full" data-node-id="1:3227">
            West Lafayette, IN · Mon, Jan 26
          </p>
        </div>
        <div className="content-stretch flex flex-col gap-[20px] items-start overflow-clip pb-[24px] px-[24px] relative shrink-0 w-full" data-node-id="1:3228" data-name="Page content">
          <div className="content-stretch flex flex-col gap-[12px] items-start overflow-clip relative shrink-0 w-full" data-node-id="1:3229" data-name="Current weather">
            <div className="content-stretch flex items-center justify-between overflow-clip relative shrink-0 w-full" data-node-id="1:3230" data-name="Feels like weather">
              <div className="[word-break:break-word] content-stretch flex flex-col font-['Inter:Semi Bold'] font-semibold gap-[4px] items-start not-italic overflow-clip relative shrink-0" data-node-id="1:3231" data-name="Temperature">
                <p className="leading-[1.5] min-w-full relative shrink-0 text-[#68758a] text-[12px] w-[min-content]" data-node-id="1:3232">
                  FEELS LIKE
                </p>
                <p className="leading-[1.1] relative shrink-0 text-[#20314f] text-[78px] whitespace-nowrap" data-node-id="1:3233">
                  26°
                </p>
                <p className="leading-[1.5] min-w-full relative shrink-0 text-[#20314f] text-[14px] w-[min-content]" data-node-id="1:3234">
                  Cloudy now. Snow later.
                </p>
              </div>
              <div className="bg-[#e8e9fc] content-stretch flex flex-col h-[115px] items-center justify-center overflow-clip relative rounded-[99px] shrink-0 w-[116px]" data-node-id="1:3235" data-name="Weather illustration">
                <div className="relative shrink-0 size-[72px]" data-node-id="1:3236" data-name="cloud-snow">
                  <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgCloudSnow} />
                </div>
              </div>
            </div>
            <div className="[word-break:break-word] content-stretch flex font-['Inter:Regular'] font-normal gap-[18px] items-start leading-[1.5] not-italic overflow-clip relative shrink-0 text-[#68758a] text-[13px] w-full" data-node-id="1:3238" data-name="Weather metrics">
              <p className="flex-[1_0_0] min-w-px relative" data-node-id="1:3239">
                Actual 34°F
              </p>
              <p className="flex-[1_0_0] min-w-px relative" data-node-id="1:3240">
                Wind W 12 mph
              </p>
              <p className="flex-[1_0_0] min-w-px relative" data-node-id="1:3241">
                H 34° / L 20°
              </p>
            </div>
          </div>
          <div className="bg-[#fff3d5] content-stretch flex flex-col items-start overflow-clip p-[18px] relative rounded-[22px] shrink-0 w-full" data-node-id="1:3242" data-name="Card">
            <div className="content-stretch flex gap-[10px] items-center overflow-clip relative shrink-0 w-full" data-node-id="1:3243" data-name="Warning">
              <div className="relative shrink-0 size-[22px]" data-node-id="1:3244" data-name="snowflake">
                <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgSnowflake} />
              </div>
              <div className="[word-break:break-word] content-stretch flex flex-[1_0_0] flex-col gap-[3px] items-start leading-[1.5] min-w-px not-italic overflow-clip relative" data-node-id="1:3246" data-name="Alert summary">
                <p className="font-['Inter:Semi Bold'] font-semibold relative shrink-0 text-[#20314f] text-[14px] w-full" data-node-id="1:3247">
                  Snow after 3 PM
                </p>
                <p className="font-['Inter:Regular'] font-normal relative shrink-0 text-[#68758a] text-[13px] w-full" data-node-id="1:3248">
                  Waterproof boots for the walk home.
                </p>
              </div>
              <div className="relative shrink-0 size-[18px]" data-node-id="1:3249" data-name="chevron-right">
                <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgChevronRight} />
              </div>
            </div>
          </div>
          <div className="content-stretch flex flex-col gap-[13px] items-start overflow-clip relative shrink-0 w-full" data-node-id="1:3251" data-name="Hourly forecast">
            <div className="[word-break:break-word] content-stretch flex items-start justify-between leading-[normal] not-italic overflow-clip relative shrink-0 w-full whitespace-nowrap" data-node-id="1:3252" data-name="Forecast header">
              <p className="font-['Inter:Regular'] font-normal relative shrink-0 text-[#20314f] text-[16px]" data-node-id="1:3253">
                The day ahead
              </p>
              <p className="font-['Inter:Semi Bold'] font-semibold relative shrink-0 text-[#6268c8] text-[12px]" data-node-id="1:3254">
                3 alerts →
              </p>
            </div>
            <div className="content-stretch flex gap-[7px] items-start overflow-clip relative shrink-0 w-full" data-node-id="1:3255" data-name="Hourly weather">
              <div className="bg-white content-stretch flex flex-[1_0_0] flex-col gap-[9px] items-center min-w-px overflow-clip px-[3px] py-[12px] relative rounded-[15px]" data-node-id="1:3256" data-name="Hour">
                <p className="[word-break:break-word] font-['Inter:Regular'] font-normal leading-[normal] not-italic relative shrink-0 text-[#68758a] text-[10px] whitespace-nowrap" data-node-id="1:3257">
                  Now
                </p>
                <div className="relative shrink-0 size-[21px]" data-node-id="1:3258" data-name="cloud">
                  <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgCloud} />
                </div>
                <p className="[word-break:break-word] font-['Inter:Regular'] font-normal leading-[normal] not-italic relative shrink-0 text-[#20314f] text-[14px] whitespace-nowrap" data-node-id="1:3260">
                  34°
                </p>
              </div>
              <div className="bg-white content-stretch flex flex-[1_0_0] flex-col gap-[9px] items-center min-w-px overflow-clip px-[3px] py-[12px] relative rounded-[15px]" data-node-id="1:3261" data-name="Hour">
                <p className="[word-break:break-word] font-['Inter:Regular'] font-normal leading-[normal] not-italic relative shrink-0 text-[#68758a] text-[10px] whitespace-nowrap" data-node-id="1:3262">
                  11 AM
                </p>
                <div className="relative shrink-0 size-[21px]" data-node-id="1:3263" data-name="cloud">
                  <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgCloud} />
                </div>
                <p className="[word-break:break-word] font-['Inter:Regular'] font-normal leading-[normal] not-italic relative shrink-0 text-[#20314f] text-[14px] whitespace-nowrap" data-node-id="1:3265">
                  33°
                </p>
              </div>
              <div className="bg-white content-stretch flex flex-[1_0_0] flex-col gap-[9px] items-center min-w-px overflow-clip px-[3px] py-[12px] relative rounded-[15px]" data-node-id="1:3266" data-name="Hour">
                <p className="[word-break:break-word] font-['Inter:Regular'] font-normal leading-[normal] not-italic relative shrink-0 text-[#68758a] text-[10px] whitespace-nowrap" data-node-id="1:3267">
                  1 PM
                </p>
                <div className="relative shrink-0 size-[21px]" data-node-id="1:3268" data-name="cloud">
                  <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgCloud} />
                </div>
                <p className="[word-break:break-word] font-['Inter:Regular'] font-normal leading-[normal] not-italic relative shrink-0 text-[#20314f] text-[14px] whitespace-nowrap" data-node-id="1:3270">
                  32°
                </p>
              </div>
              <div className="bg-[#e8e9fc] content-stretch flex flex-[1_0_0] flex-col gap-[9px] items-center min-w-px overflow-clip px-[3px] py-[12px] relative rounded-[15px]" data-node-id="1:3271" data-name="Hour">
                <p className="[word-break:break-word] font-['Inter:Regular'] font-normal leading-[normal] not-italic relative shrink-0 text-[#68758a] text-[10px] whitespace-nowrap" data-node-id="1:3272">
                  3 PM
                </p>
                <div className="relative shrink-0 size-[21px]" data-node-id="1:3273" data-name="cloud-snow">
                  <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgCloudSnow1} />
                </div>
                <p className="[word-break:break-word] font-['Inter:Regular'] font-normal leading-[normal] not-italic relative shrink-0 text-[#20314f] text-[14px] whitespace-nowrap" data-node-id="1:3275">
                  29°
                </p>
              </div>
              <div className="bg-white content-stretch flex flex-[1_0_0] flex-col gap-[9px] items-center min-w-px overflow-clip px-[3px] py-[12px] relative rounded-[15px]" data-node-id="1:3276" data-name="Hour">
                <p className="[word-break:break-word] font-['Inter:Regular'] font-normal leading-[normal] not-italic relative shrink-0 text-[#68758a] text-[10px] whitespace-nowrap" data-node-id="1:3277">
                  5 PM
                </p>
                <div className="relative shrink-0 size-[21px]" data-node-id="1:3278" data-name="snowflake">
                  <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgSnowflake1} />
                </div>
                <p className="[word-break:break-word] font-['Inter:Regular'] font-normal leading-[normal] not-italic relative shrink-0 text-[#20314f] text-[14px] whitespace-nowrap" data-node-id="1:3280">
                  26°
                </p>
              </div>
            </div>
          </div>
          <div className="content-stretch flex flex-col gap-[12px] items-start overflow-clip relative shrink-0 w-full" data-node-id="1:3281" data-name="Daily outfit recommendation">
            <div className="[word-break:break-word] content-stretch flex font-['Inter:Regular'] font-normal items-start justify-between leading-[normal] not-italic overflow-clip relative shrink-0 w-full whitespace-nowrap" data-node-id="1:3282" data-name="Recommendation header">
              <p className="relative shrink-0 text-[#20314f] text-[17px]" data-node-id="1:3283">
                Made for your Monday
              </p>
              <p className="relative shrink-0 text-[#6268c8] text-[10px]" data-node-id="1:3284">
                RUNS COLD
              </p>
            </div>
            <div className="bg-[#e8e9fc] content-stretch flex h-[170px] items-center overflow-clip p-[12px] relative rounded-[20px] shrink-0 w-full" data-node-id="1:3285" data-name="Coordinated outfit illustration">
              <div className="content-stretch flex flex-[1_0_0] flex-col items-center min-w-px overflow-clip relative" data-node-id="1:3286" data-name="Outerwear">
                <div className="h-[110.4px] mb-[-8px] relative shrink-0 w-[92px]" data-node-id="1:3287" data-name="Clothing illustration">
                  <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgClothingIllustration} />
                </div>
                <div className="h-[48px] relative shrink-0 w-[40px]" data-node-id="1:3288" data-name="Clothing illustration">
                  <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgClothingIllustration1} />
                </div>
              </div>
              <div className="content-stretch flex flex-[1_0_0] flex-col items-center min-w-px overflow-clip relative" data-node-id="1:3289" data-name="Core layers">
                <div className="h-[70.8px] mb-[-4px] relative shrink-0 w-[59px]" data-node-id="1:3290" data-name="Clothing illustration">
                  <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgClothingIllustration2} />
                </div>
                <div className="h-[72px] relative shrink-0 w-[60px]" data-node-id="1:3291" data-name="Clothing illustration">
                  <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgClothingIllustration3} />
                </div>
              </div>
              <div className="content-stretch flex flex-[1_0_0] flex-col items-center min-w-px overflow-clip relative" data-node-id="1:3292" data-name="Finishing pieces">
                <div className="h-[54px] mb-[-4px] relative shrink-0 w-[45px]" data-node-id="1:3293" data-name="Clothing illustration">
                  <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgClothingIllustration4} />
                </div>
                <div className="h-[57px] mb-[-4px] relative shrink-0 w-[60px]" data-node-id="1:3294" data-name="Clothing illustration">
                  <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgClothingIllustration5} />
                </div>
                <div className="h-[26.4px] relative shrink-0 w-[22px]" data-node-id="1:3295" data-name="Clothing illustration">
                  <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgClothingIllustration6} />
                </div>
              </div>
            </div>
            <div className="content-stretch flex gap-[8px] items-start overflow-clip relative shrink-0 w-full" data-node-id="1:3296" data-name="Outfit caption">
              <div className="[word-break:break-word] content-stretch flex flex-[1_0_0] flex-col gap-[2px] items-start leading-[1.5] min-w-px not-italic overflow-clip relative" data-node-id="1:3297" data-name="Summary">
                <p className="font-['Inter:Semi Bold'] font-semibold relative shrink-0 text-[#20314f] text-[14px] w-full" data-node-id="1:3298">
                  Campus snow day
                </p>
                <p className="font-['Inter:Regular'] font-normal relative shrink-0 text-[#68758a] text-[13px] w-full" data-node-id="1:3299">
                  Warm layers. Dry feet. Ready for class.
                </p>
              </div>
              <div className="relative shrink-0 size-[22px]" data-node-id="1:3300" data-name="sparkles">
                <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgSparkles} />
              </div>
            </div>
            <div className="bg-[#6268c8] content-stretch flex h-[50px] items-center justify-center overflow-clip relative rounded-[14px] shrink-0 w-full" data-node-id="1:3302" data-name="Action">
              <p className="[word-break:break-word] font-['Inter:Regular'] font-normal leading-[normal] not-italic relative shrink-0 text-[14px] text-white whitespace-nowrap" data-node-id="1:3303">
                View My Outfit →
              </p>
            </div>
          </div>
          <div className="content-stretch flex gap-[10px] items-start overflow-clip relative shrink-0 w-full" data-node-id="1:3304" data-name="Plan shortcut">
            <div className="relative shrink-0 size-[18px]" data-node-id="1:3305" data-name="calendar-days">
              <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgCalendarDays} />
            </div>
            <p className="[word-break:break-word] flex-[1_0_0] font-['Inter:Regular'] font-normal leading-[1.5] min-w-px not-italic relative text-[#68758a] text-[13px]" data-node-id="1:3307">
              3 activities today · Personalize in Plan →
            </p>
          </div>
        </div>
      </div>
      <div className="bg-white border-[#dfe5ee] border-solid border-t content-stretch flex gap-[4px] h-[82px] items-start overflow-clip pb-[17px] pt-[10px] px-[16px] relative shrink-0 w-full" data-node-id="1:3308" data-name="Bottom navigation">
        <div className="bg-[#e8e9fc] content-stretch flex flex-[1_0_0] flex-col gap-[5px] items-center min-w-px overflow-clip p-[5px] relative rounded-[13px]" data-node-id="1:3309" data-name="Tab">
          <div className="relative shrink-0 size-[22px]" data-node-id="1:3310" data-name="cloud-sun">
            <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgCloudSun} />
          </div>
          <p className="[word-break:break-word] font-['Inter:Bold'] font-bold leading-[normal] not-italic relative shrink-0 text-[#6268c8] text-[10px] whitespace-nowrap" data-node-id="1:3312">
            Today
          </p>
        </div>
        <div className="bg-white content-stretch flex flex-[1_0_0] flex-col gap-[5px] items-center min-w-px overflow-clip p-[5px] relative rounded-[13px]" data-node-id="1:3313" data-name="Tab">
          <div className="relative shrink-0 size-[22px]" data-node-id="1:3314" data-name="shirt">
            <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgShirt} />
          </div>
          <p className="[word-break:break-word] font-['Inter:Medium'] font-medium leading-[normal] not-italic relative shrink-0 text-[#68758a] text-[10px] whitespace-nowrap" data-node-id="1:3316">
            Outfit
          </p>
        </div>
        <div className="bg-white content-stretch flex flex-[1_0_0] flex-col gap-[5px] items-center min-w-px overflow-clip p-[5px] relative rounded-[13px]" data-node-id="1:3317" data-name="Tab">
          <div className="relative shrink-0 size-[22px]" data-node-id="1:3318" data-name="calendar-days">
            <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgCalendarDays1} />
          </div>
          <p className="[word-break:break-word] font-['Inter:Medium'] font-medium leading-[normal] not-italic relative shrink-0 text-[#68758a] text-[10px] whitespace-nowrap" data-node-id="1:3320">
            Plan
          </p>
        </div>
        <div className="bg-white content-stretch flex flex-[1_0_0] flex-col gap-[5px] items-center min-w-px overflow-clip p-[5px] relative rounded-[13px]" data-node-id="1:3321" data-name="Tab">
          <div className="relative shrink-0 size-[22px]" data-node-id="1:3322" data-name="sliders-horizontal">
            <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgSlidersHorizontal} />
          </div>
          <p className="[word-break:break-word] font-['Inter:Medium'] font-medium leading-[normal] not-italic relative shrink-0 text-[#68758a] text-[10px] whitespace-nowrap" data-node-id="1:3324">
            Settings
          </p>
        </div>
      </div>
    </div>
  );
}