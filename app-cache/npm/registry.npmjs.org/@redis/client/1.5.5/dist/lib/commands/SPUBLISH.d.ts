import { RedisCommandArgument, RedisCommandArguments } from '.';
export declare const IS_READ_ONLY = true;
export declare const FIRST_KEY_INDEX = 1;
export declare function transformArguments(channel: RedisCommandArgument, message: RedisCommandArgument): RedisCommandArguments;
export declare function transformReply(): number;
