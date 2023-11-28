import { makeAutoObservable, runInAction } from "mobx"
import { IActivity } from "../models/activity"
import agent from "../api/agent";
import {v4 as uuid} from 'uuid'
import { format } from "date-fns";

export default class ActivityStore {
 
    activities: IActivity[] = []
    activityRegistry = new Map<string, IActivity>() ;
    selectedActivity: IActivity | undefined; 
    editMode = false;
    loading = false;
    loadingInitial = false;
    submitting = false;
    deleteSubmitting = false;
    constructor() {
        makeAutoObservable(this)
    }

   get groupedActivities() {
        return Object.entries(
            this.activitiesByDate.reduce((activities, activity) => {
                const date = format(activity.date!, 'dd MMM yyyy');
                activities[date] = activities[date] ? [...activities[date], activity] : [activity];
                return activities;
            }, {} as { [key: string]: IActivity[] })
        )
    }

    get activitiesByDate() {
        return Array.from(this.activityRegistry.values()).sort((a, b) =>
            a.date!.getTime() - b.date!.getTime())
    }


    loadActivities = async () => {
        this.loadingInitial = true
        try {
                const activities = await agent.Activities.list();

                if(this.activityRegistry.size == 0) {
                    activities.forEach(activity => {
                            this.setActivity(activity)
                      })
                    } 
                    runInAction(() => {

                        this.loadingInitial = false
                    })
            

        } catch(err) {
            console.log(err)
            runInAction(() => {

                this.loadingInitial = false
            })
        }
    }

    loadActivity = async (id: string) => {
        let activity  = this.getActivity(id)
        if(activity) {
             this.selectedActivity = activity
             return activity
        } else {
            this.loadingInitial = true
            try {
                activity = await agent.Activities.details(id)
                this.setActivity(activity)
                runInAction(() => {

                    this.selectedActivity = activity 
                    this.loadingInitial = false
                })
                return activity
            } catch(err) {
                console.log(err);
                runInAction(() => {
                    
                    this.loadingInitial = false
                })
            }
        }
    }


    private setActivity = (activity: IActivity) => {
       // activity.date = activity.date.split('T')[0]
        activity.date = new Date(activity.date!)
        this.activities.push(activity)
        this.activityRegistry.set(activity.id, activity)
    }

    private getActivity =  (id: string) => {
        return this.activityRegistry.get(id);
    }



    createActivity = async (activity: IActivity) => {
        this.loading = true;
        activity.id = uuid()

        try {
                await agent.Activities.create(activity)
                runInAction(() => {
                   // this.activities.push(activity)
                    this.activityRegistry.set (activity.id, activity)
                    this.selectedActivity = activity;
                    this.editMode = false
                    this.loading = false
                })
        } catch (err) {
            console.log(err);
            runInAction(() => {
                this.loading = false
            })
        } 
    }

    updateActivity = async (activity: IActivity) => {
        this.loading = true;


        try {
            await agent.Activities.update(activity)
            runInAction(() => {
                // this.activities = [...this.activities.filter(x => x.id !== activity.id), activity]

                if (activity.id) {
                    let updatedActivity = { ...this.getActivity(activity.id), ...activity };
                    this.activityRegistry.set(activity.id, updatedActivity as IActivity);
                    this.selectedActivity = updatedActivity as IActivity;
                    this.editMode = false
                    this.loading = false
                }
            })
        } catch(err) {
            console.log(err);
            runInAction(() => {
                    this.loading = false
            })
        }
    }
    
    deleteActivity = async(id: string) => {
        this.loading = true;
        this.deleteSubmitting = true;

        try {
            await agent.Activities.delete(id)
            runInAction(() => {

                this.activityRegistry.delete(id)
                this.loading = false
                this.deleteSubmitting = false
            })
        } catch(err) {
                console.log(err);
                runInAction(() => {

                    this.loading = false
                    this.deleteSubmitting = false
                })
                
        }
    }
}

