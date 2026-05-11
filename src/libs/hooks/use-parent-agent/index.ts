import { useQuery, useMutation } from "react-query";
import { parentAgentService } from "@/libs/services/auth/parentsAgent.service";

interface UseParentAgentProps {
    id?: any;
    onSuccess?: (data: any) => void;
    onError?: (error: any) => void;
}


export const useParentAgent = () => {
    const PARENT_AGENT_QUERY_KEY = "parent-agent";

    const useGetAllParentsAgents = ({ onSuccess, onError }: UseParentAgentProps) =>
        useQuery(
            [PARENT_AGENT_QUERY_KEY, "getAllParentsAgents"],
            () =>
                parentAgentService.getAllParentsAgents(),
            {
                onSuccess: (data: any) => {
                    console.log("data", data);
                    if (onSuccess) onSuccess(data);
                },
                onError: (error) => {
                    if (onError) onError(error);
                },
            }
        );

    const useGetParentAgentById = ({ id, onSuccess, onError }: UseParentAgentProps) =>
        useQuery(
            [PARENT_AGENT_QUERY_KEY, "getParentAgentById"],
            () =>
                parentAgentService.getParentAgentById(id),
            {
                onSuccess: (data: any) => {
                    if (onSuccess) onSuccess(data);
                },
                onError: (error) => {
                    if (onError) onError(error);
                },
            }
        );


    const useCreateParentAgent = ({ onSuccess, onError }: UseParentAgentProps) =>
        useMutation(
            [PARENT_AGENT_QUERY_KEY, "createParentAgent"],
            (data: any) => parentAgentService.createParentAgent(data),
            {
                onSuccess: (data: any) => {
                    if (onSuccess) onSuccess(data);
                },
                onError: (error) => {
                    if (onError) onError(error);
                },
            }
        );
    const useCreateSettingsParentAgent = ({ onSuccess, onError }: UseParentAgentProps) =>
        useMutation(
            [PARENT_AGENT_QUERY_KEY, "createSettingsParentAgent"],
            (data: any) => parentAgentService.createSettingsParentAgent(data),
            {
                onSuccess: (data: any) => {
                    if (onSuccess) onSuccess(data);
                },
                onError: (error) => {
                    if (onError) onError(error);
                },
            }
        );
    const useDeleteParentAgent = ({ onSuccess, onError }: UseParentAgentProps) =>
        useMutation(
            [PARENT_AGENT_QUERY_KEY, "deleteParentAgent"],
            (data: any) => parentAgentService.deleteParentAgent(data.id),
            {
                onSuccess: (data: any) => {
                    if (onSuccess) onSuccess(data);
                },
                onError: (error) => {
                    if (onError) onError(error);
                },
            }
        );
    return {
        useGetAllParentsAgents,
        useGetParentAgentById,
        useCreateParentAgent,
        useCreateSettingsParentAgent,
        useDeleteParentAgent,
    };
};
