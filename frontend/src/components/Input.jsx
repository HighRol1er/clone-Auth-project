
/**
 * icon을 component로 사용하기 위해 대문자 사용.?
 * 이렇게 하고 SignUppage 에서 icon={User}을 내려주니깐 진짜 되네.. 개신기 */
const Input = ({icon:Icon, ...props}) => { 
  return (
    <div className="relative mb-6">
      <div className="absolute inset-y-0 flex items-center pl-3 pointer-events-none">
        <Icon className='size-5 text-green-500' />
      </div>
      <input 
        {...props}
        className="w-full pl-10 pr-3 py-2 bg-gray-800 bg-opacity-50 rounded-lg border border-gray-700
        focus:border-green-500 focus:ring-2 focus:ring-green-500 text-white placeholder-gray-400 transition
        duration-200"
      />
    </div>
  );
};

export default Input;