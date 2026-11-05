import WeatherWiseLogo from '../WeatherWiseLogo';
import { categoryPhotos } from '../categoryPhotos';

const assetPathPrefix = "/assets";
const imgIosSignal = `${assetPathPrefix}/45ff0.svg`;
const imgIosWifiSignal = `${assetPathPrefix}/3f1e3.svg`;
const imgIosBatteryFull = `${assetPathPrefix}/9939f.svg`;
const imgClothingIllustration = categoryPhotos['Tops & knits'].src;
const imgCircleCheck = `${assetPathPrefix}/1a02e.svg`;
const imgClothingIllustration1 = categoryPhotos['Base layers'].src;
const imgClothingIllustration2 = categoryPhotos['Coats & jackets'].src;
const imgClothingIllustration3 = categoryPhotos['Pants & jeans'].src;
const imgClothingIllustration4 = categoryPhotos['Boots & sneakers'].src;
const imgClothingIllustration5 = categoryPhotos['Accessories'].src;
const imgClothingIllustration6 = categoryPhotos['Gym clothing'].src;
const imgCircle = `${assetPathPrefix}/f8699.svg`;
const imgClothingIllustration7 = categoryPhotos['Dresses & skirts'].src;

export default function ClothingInventoryOnboarding() {
  return (
    <div className="screen bg-[#f3f6fb] flex flex-col items-start justify-between relative w-full min-h-dvh" data-node-id="1:3325" data-name="Clothing inventory onboarding">
      <div className="content-stretch flex flex-col items-start overflow-clip relative shrink-0 w-full" data-node-id="1:3326" data-name="Screen body">
        
        <div className="content-stretch flex flex-col gap-[20px] items-start overflow-clip pb-[24px] px-[24px] relative shrink-0 w-full" data-node-id="1:3336" data-name="Page content">
          <div className="content-stretch flex flex-col gap-[13px] items-start overflow-clip relative shrink-0 w-full" data-node-id="1:3337" data-name="Onboarding progress">
            <div className="[word-break:break-word] content-stretch flex items-center justify-between leading-[normal] not-italic overflow-clip relative shrink-0 w-full whitespace-nowrap" data-node-id="1:3338" data-name="Brand">
              <WeatherWiseLogo />
              <p className="font-['Inter:Regular'] font-normal relative shrink-0 text-[#68758a] text-[12px]" data-node-id="1:3340">
                04 / 04
              </p>
            </div>
            <div className="content-stretch flex gap-[6px] items-start overflow-clip relative shrink-0 w-full" data-node-id="1:3341" data-name="Progress">
              <div className="bg-[#6268c8] flex-[1_0_0] h-[4px] min-w-px relative rounded-[4px]" data-node-id="1:3342" data-name="Progress track" />
              <div className="bg-[#6268c8] flex-[1_0_0] h-[4px] min-w-px relative rounded-[4px]" data-node-id="1:3343" data-name="Progress track" />
              <div className="bg-[#6268c8] flex-[1_0_0] h-[4px] min-w-px relative rounded-[4px]" data-node-id="1:3344" data-name="Progress track" />
              <div className="bg-[#6268c8] flex-[1_0_0] h-[4px] min-w-px relative rounded-[4px]" data-name="Progress track" />
            </div>
          </div>
          <div className="content-stretch flex flex-col items-start overflow-clip pt-[12px] relative shrink-0 w-full" data-node-id="1:3345" data-name="Introduction">
            <div className="[word-break:break-word] font-['Inter:Bold'] font-bold leading-[0] not-italic relative shrink-0 text-[#20314f] text-[30px] w-full" data-node-id="1:3346">
              <p className="leading-[1.15] mb-0">Pick what you</p>
              <p className="leading-[1.15]">own.</p>
            </div>
          </div>
          <div className="content-stretch flex flex-col gap-[10px] items-start overflow-clip relative shrink-0 w-full" data-node-id="1:3347" data-name="Inventory choices">
            <div className="content-stretch flex gap-[10px] items-start overflow-clip relative shrink-0 w-full" data-node-id="1:3348" data-name="Category row">
              <div className="bg-[#e8e9fc] border border-[#6268c8] border-solid content-stretch flex flex-[1_0_0] flex-col gap-[2px] h-[112px] items-start min-w-px overflow-clip p-[10px] relative rounded-[16px]" data-node-id="1:3349" data-name="Clothing category">
                <div className="content-stretch flex items-center justify-between overflow-clip relative shrink-0 w-full" data-node-id="1:3350" data-name="Category preview">
                  <div className="h-[57.6px] relative shrink-0 w-[48px]" data-node-id="1:3351" data-name="Clothing illustration">
                    <img alt="Cream knit crewneck" className="absolute block inset-0 max-w-none size-full category-photo" src={imgClothingIllustration} />
                  </div>
                  <div className="relative shrink-0 size-[20px]" data-node-id="1:3352" data-name="circle-check">
                    <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgCircleCheck} />
                  </div>
                </div>
                <p className="[word-break:break-word] font-['Inter:Semi Bold'] font-semibold leading-[normal] not-italic relative shrink-0 text-[#20314f] text-[12px] whitespace-nowrap" data-node-id="1:3354">{`Tops & knits`}</p>
              </div>
              <div className="bg-[#e8e9fc] border border-[#6268c8] border-solid content-stretch flex flex-[1_0_0] flex-col gap-[2px] h-[112px] items-start min-w-px overflow-clip p-[10px] relative rounded-[16px]" data-node-id="1:3355" data-name="Clothing category">
                <div className="content-stretch flex items-center justify-between overflow-clip relative shrink-0 w-full" data-node-id="1:3356" data-name="Category preview">
                  <div className="h-[57.6px] relative shrink-0 w-[48px]" data-node-id="1:3357" data-name="Clothing illustration">
                    <div className="absolute inset-[0_1.09%]">
                      <img alt="Black base-layer top" className="block max-w-none size-full category-photo" src={imgClothingIllustration1} />
                    </div>
                  </div>
                  <div className="relative shrink-0 size-[20px]" data-node-id="1:3358" data-name="circle-check">
                    <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgCircleCheck} />
                  </div>
                </div>
                <p className="[word-break:break-word] font-['Inter:Semi Bold'] font-semibold leading-[normal] not-italic relative shrink-0 text-[#20314f] text-[12px] whitespace-nowrap" data-node-id="1:3360">
                  Base layers
                </p>
              </div>
            </div>
            <div className="content-stretch flex gap-[10px] items-start overflow-clip relative shrink-0 w-full" data-node-id="1:3361" data-name="Category row">
              <div className="bg-[#e8e9fc] border border-[#6268c8] border-solid content-stretch flex flex-[1_0_0] flex-col gap-[2px] h-[112px] items-start min-w-px overflow-clip p-[10px] relative rounded-[16px]" data-node-id="1:3362" data-name="Clothing category">
                <div className="content-stretch flex items-center justify-between overflow-clip relative shrink-0 w-full" data-node-id="1:3363" data-name="Category preview">
                  <div className="h-[57.6px] relative shrink-0 w-[48px]" data-node-id="1:3364" data-name="Clothing illustration">
                    <img alt="Olive green parka" className="absolute block inset-0 max-w-none size-full category-photo" src={imgClothingIllustration2} />
                  </div>
                  <div className="relative shrink-0 size-[20px]" data-node-id="1:3365" data-name="circle-check">
                    <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgCircleCheck} />
                  </div>
                </div>
                <p className="[word-break:break-word] font-['Inter:Semi Bold'] font-semibold leading-[normal] not-italic relative shrink-0 text-[#20314f] text-[12px] whitespace-nowrap" data-node-id="1:3367">{`Coats & jackets`}</p>
              </div>
              <div className="bg-[#e8e9fc] border border-[#6268c8] border-solid content-stretch flex flex-[1_0_0] flex-col gap-[2px] h-[112px] items-start min-w-px overflow-clip p-[10px] relative rounded-[16px]" data-node-id="1:3368" data-name="Clothing category">
                <div className="content-stretch flex items-center justify-between overflow-clip relative shrink-0 w-full" data-node-id="1:3369" data-name="Category preview">
                  <div className="h-[57.6px] relative shrink-0 w-[48px]" data-node-id="1:3370" data-name="Clothing illustration">
                    <img alt="Navy jeans" className="absolute block inset-0 max-w-none size-full category-photo" src={imgClothingIllustration3} />
                  </div>
                  <div className="relative shrink-0 size-[20px]" data-node-id="1:3371" data-name="circle-check">
                    <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgCircleCheck} />
                  </div>
                </div>
                <p className="[word-break:break-word] font-['Inter:Semi Bold'] font-semibold leading-[normal] not-italic relative shrink-0 text-[#20314f] text-[12px] whitespace-nowrap" data-node-id="1:3373">{`Pants & jeans`}</p>
              </div>
            </div>
            <div className="content-stretch flex gap-[10px] items-start overflow-clip relative shrink-0 w-full" data-node-id="1:3374" data-name="Category row">
              <div className="bg-[#e8e9fc] border border-[#6268c8] border-solid content-stretch flex flex-[1_0_0] flex-col gap-[2px] h-[112px] items-start min-w-px overflow-clip p-[10px] relative rounded-[16px]" data-node-id="1:3375" data-name="Clothing category">
                <div className="content-stretch flex items-center justify-between overflow-clip relative shrink-0 w-full" data-node-id="1:3376" data-name="Category preview">
                  <div className="h-[45.6px] relative shrink-0 w-[48px]" data-node-id="1:3377" data-name="Clothing illustration">
                    <img alt="Black lace-up boots" className="absolute block inset-0 max-w-none size-full category-photo" src={imgClothingIllustration4} />
                  </div>
                  <div className="relative shrink-0 size-[20px]" data-node-id="1:3378" data-name="circle-check">
                    <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgCircleCheck} />
                  </div>
                </div>
                <p className="[word-break:break-word] font-['Inter:Semi Bold'] font-semibold leading-[normal] not-italic relative shrink-0 text-[#20314f] text-[12px] whitespace-nowrap" data-node-id="1:3380">{`Boots & sneakers`}</p>
              </div>
              <div className="bg-[#e8e9fc] border border-[#6268c8] border-solid content-stretch flex flex-[1_0_0] flex-col gap-[2px] h-[112px] items-start min-w-px overflow-clip p-[10px] relative rounded-[16px]" data-node-id="1:3381" data-name="Clothing category">
                <div className="content-stretch flex items-center justify-between overflow-clip relative shrink-0 w-full" data-node-id="1:3382" data-name="Category preview">
                  <div className="h-[57.6px] relative shrink-0 w-[48px]" data-node-id="1:3383" data-name="Clothing illustration">
                    <img alt="Grey knitted scarf" className="absolute block inset-0 max-w-none size-full category-photo" src={imgClothingIllustration5} />
                  </div>
                  <div className="relative shrink-0 size-[20px]" data-node-id="1:3384" data-name="circle-check">
                    <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgCircleCheck} />
                  </div>
                </div>
                <p className="[word-break:break-word] font-['Inter:Semi Bold'] font-semibold leading-[normal] not-italic relative shrink-0 text-[#20314f] text-[12px] whitespace-nowrap" data-node-id="1:3386">
                  Accessories
                </p>
              </div>
            </div>
            <div className="content-stretch flex gap-[10px] items-start overflow-clip relative shrink-0 w-full" data-node-id="1:3387" data-name="Category row">
              <div className="bg-white border border-[#dfe5ee] border-solid content-stretch flex flex-[1_0_0] flex-col gap-[2px] h-[112px] items-start min-w-px overflow-clip p-[10px] relative rounded-[16px]" data-node-id="1:3388" data-name="Clothing category">
                <div className="content-stretch flex items-center justify-between overflow-clip relative shrink-0 w-full" data-node-id="1:3389" data-name="Category preview">
                  <div className="h-[57.6px] relative shrink-0 w-[48px]" data-node-id="1:3390" data-name="Clothing illustration">
                    <img alt="Black workout top" className="absolute block inset-0 max-w-none size-full category-photo" src={imgClothingIllustration6} />
                  </div>
                  <div className="relative shrink-0 size-[20px]" data-node-id="1:3391" data-name="circle">
                    <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgCircle} />
                  </div>
                </div>
                <p className="[word-break:break-word] font-['Inter:Semi Bold'] font-semibold leading-[normal] not-italic relative shrink-0 text-[#20314f] text-[12px] whitespace-nowrap" data-node-id="1:3393">
                  Gym clothing
                </p>
              </div>
              <div className="bg-white border border-[#dfe5ee] border-solid content-stretch flex flex-[1_0_0] flex-col gap-[2px] h-[112px] items-start min-w-px overflow-clip p-[10px] relative rounded-[16px]" data-node-id="1:3394" data-name="Clothing category">
                <div className="content-stretch flex items-center justify-between overflow-clip relative shrink-0 w-full" data-node-id="1:3395" data-name="Category preview">
                  <div className="h-[57.6px] relative shrink-0 w-[48px]" data-node-id="1:3396" data-name="Clothing illustration">
                    <img alt="Floral midi dress" className="absolute block inset-0 max-w-none size-full category-photo" src={imgClothingIllustration7} />
                  </div>
                  <div className="relative shrink-0 size-[20px]" data-node-id="1:3397" data-name="circle">
                    <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgCircle} />
                  </div>
                </div>
                <p className="[word-break:break-word] font-['Inter:Semi Bold'] font-semibold leading-[normal] not-italic relative shrink-0 text-[#20314f] text-[12px] whitespace-nowrap" data-node-id="1:3399">{`Dresses & skirts`}</p>
              </div>
            </div>
          </div>
          <p className="[word-break:break-word] font-['Inter:Regular'] font-normal leading-[1.5] not-italic relative shrink-0 text-[#68758a] text-[11px] w-full" data-node-id="1:3400">
            Edit anytime in Settings.
          </p>
          <div className="bg-[#6268c8] content-stretch flex h-[50px] items-center justify-center overflow-clip relative rounded-[14px] shrink-0 w-full" data-node-id="1:3401" data-name="Action">
            <p className="[word-break:break-word] font-['Inter:Regular'] font-normal leading-[normal] not-italic relative shrink-0 text-[14px] text-white whitespace-nowrap" data-node-id="1:3402">
              Continue
            </p>
          </div>
          <div className="[word-break:break-word] content-stretch flex font-['Inter:Semi Bold'] font-semibold items-start justify-between leading-[normal] not-italic overflow-clip py-[5px] relative shrink-0 text-[#6268c8] text-[13px] w-full whitespace-nowrap" data-node-id="1:3403" data-name="Onboarding actions">
            <p className="relative shrink-0" data-node-id="1:3404">
              ← Back
            </p>
            <p className="relative shrink-0" data-node-id="1:3405">
              Skip for now
            </p>
          </div>
        </div>
      </div>
      
    </div>
  );
}
