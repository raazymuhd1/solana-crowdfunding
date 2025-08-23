import Image, { StaticImageData } from "next/image"

interface ICampaignProps {
    title: string;
    desc: string;
    img: StaticImageData;
}

const CampaignCard = ({ title, desc, img }: ICampaignProps) => {

    return (
        <div className="min-w-[300px] min-h-[300px] p-[20px] rounded-[15px] border-[1px] flex flex-col gap-[10px] overflow-hidden">
            {/* small banner */}
            <Image src={img} placeholder="blur" className="w-full h-[50%] object-cover cursor-pointer transition-[scale,500ms] hover:scale-[1.1]" alt="campaign-banner" />

            <article className="h-[50%]">
                {/* campaign title */}
                <h3 className="font-bold"> {title} </h3>
                {/* campaign desc */}
                <p> {desc} </p>
                {/* donate button */}
                <button> Support </button>
            </article>
        </div>
    )
}

export default CampaignCard