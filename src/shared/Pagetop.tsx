import Image from 'next/image';

const Pagetop = ({ children, title }: { children: React.ReactNode, title: string }) => {
    return (
        <div className='py-8 md:py-10 lg:py-12 xl:py-16 w-full relative bg-[url("/pattern.png")] bg-no-repeat bg-cover bg-center bg-primary'>
            <div className='container px-5 h-full space-y-2'>
                <h3 className="text-2xl md:text-3xl lg:text-3xl xl:text-4xl font-montserrat font-bold text-white">{title}</h3>
                {children}
            </div>

        </div>
    );
};

export default Pagetop