import { Block } from '@attom';

export type PrimaryStepperProps = {
	boxProps?: React.HTMLAttributes<HTMLDivElement>;
	//
	nameProperty?: string;
	valueProperty?: string;
	options?: { [key: string]: any }[] | string[];
	value?: string;
	passedBgColor?: string;
	remainBgColor?: string;
	activeBgColor?: string;
};

export const PrimaryStepper: React.FC<PrimaryStepperProps> = ({
	boxProps,
	//
	nameProperty = 'name',
	valueProperty = 'value',
	options = [],
	value = '',
	// BgColor
	passedBgColor = 'text-text-tertiary',
	remainBgColor = 'text-text-tertiary',
	activeBgColor = 'text-text-tertiary',
}) => {
	//
	const currentStatusIndex = (options || []).findIndex(
		(current) => value === (typeof current === 'string' ? current : current[valueProperty] || ''),
	);

	return (
		<Block {...boxProps} boxProps={{ className: boxProps?.className || '' }}>
			<div className='flex items-center gap-4 flex-wrap'>
				{(options || []).map((item, i) => {
					const currentKey = typeof item === 'string' ? item : item[valueProperty] || '';
					const currentName = typeof item === 'string' ? item : item[nameProperty] || '';

					const isLastItem = i + 1 === options.length;
					const isFirstItem = i === 0;

					const status = (i === currentStatusIndex && 'active') || (i < currentStatusIndex && 'pass') || 'remain';

					const colors = {
						textColor:
							(status === 'active' && 'text-text-primary') || (status === 'pass' && 'text-text-primary') || 'text-[#ddd5dd]',
						bgColor: (status === 'active' && 'bg-primary-2') || (status === 'pass' && 'bg-success') || 'bg-[#ddd5dd]',
					};

					return (
						<div className={`flex flex-col gap-2 ${isLastItem ? '' : 'grow'}`} key={i}>
							<div className={`flex items-center gap-4`}>
								<div className={`rounded-full flex items-center justify-center h-7 w-7 ${colors?.bgColor}`}>
									{status === 'pass' ? (
										<i className='fa fa-check text-white' />
									) : (
										<span className='w-[10px] h-[10px] bg-white rounded-full' />
									)}
								</div>
								{!isLastItem && (
									<div className={`flex justify-between h-[2px] grow ${colors?.bgColor}`}>
										<span className={`block w-[6px] h-[6px] rounded-full -translate-y-[2px] ${colors?.bgColor}`} />
										<span className={`block w-[6px] h-[6px] rounded-full -translate-y-[2px] ${colors?.bgColor}`} />
									</div>
								)}
							</div>
							<div
								className={`min-h-[20px] w-fit text-xs font-semibold ${colors?.textColor} ${!isFirstItem && !isLastItem && `translate-x-1/3`}`}
							>
								{currentName}
							</div>
						</div>
					);
				})}
			</div>
		</Block>
	);
};

export default PrimaryStepper;

{
	/* <div className='contents' key={i}>
<div className='relative pb-[30px] bg-red-50'>
  <div className='rounded-full flex items-center justify-center h-[30px] w-[30px] bg-success'>
    <div
      className={`absolute top-[calc(100%_-_20px)] whitespace-nowrap ${(i === 0 && 'right-0') || (i + 1 === options.length && 'left-0') || ''}`}
    >
      {currentName} {currentName} {currentName} {currentName}
    </div>
  </div>
</div>
{i + 1 < options.length && <div className='h-[1px] grow bg-success'></div>}
</div> */
}
