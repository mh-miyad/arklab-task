"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  clearAllFilters,
  setCategoryFilters,
  setPricingModelFilter,
  setSearchQuery,
  setStatusFilters,
} from "@/store/slices/agentSlice";
import { motion } from "framer-motion";
import { Filter, Search, X } from "lucide-react";

export default function FilterPanel() {
  const dispatch = useAppDispatch();
  const { agents, filters } = useAppSelector((state) => state.agents);

  const allStatuses = Array.from(new Set(agents.map((agent) => agent.status)));
  const allCategories = Array.from(
    new Set(agents.map((agent) => agent.category))
  );
  const allPricingModels = Array.from(
    new Set(agents.map((agent) => agent.pricingModel))
  );

  const handleStatusChange = (status: string, checked: boolean) => {
    const newFilters = checked
      ? [...filters.statusFilters, status]
      : filters.statusFilters.filter((s) => s !== status);
    dispatch(setStatusFilters(newFilters));
  };

  const handleCategoryChange = (category: string, checked: boolean) => {
    const newFilters = checked
      ? [...filters.categoryFilters, category]
      : filters.categoryFilters.filter((c) => c !== category);
    dispatch(setCategoryFilters(newFilters));
  };

  const handlePricingModelChange = (value: string) => {
    // If "all" is selected, clear the filter by setting empty string
    const filterValue = value === "all" ? "" : value;
    dispatch(setPricingModelFilter(filterValue));
  };

  const hasActiveFilters =
    filters.searchQuery ||
    filters.statusFilters.length > 0 ||
    filters.categoryFilters.length > 0 ||
    filters.pricingModelFilter;

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="sticky top-4 min-w-[300px]">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="w-5 h-5" />
            Filters
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Search */}
          <div className="space-y-2">
            <Label htmlFor="search">Search Agents</Label>
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                id="search"
                placeholder="Search by name or description..."
                value={filters.searchQuery}
                onChange={(e) => dispatch(setSearchQuery(e.target.value))}
                className="pl-10"
              />
            </div>
          </div>

          {/* Status Filter */}
          <div className="space-y-3">
            <Label>Status</Label>
            <div className="space-y-2">
              {allStatuses.map((status) => (
                <div key={status} className="flex items-center space-x-2">
                  <Checkbox
                    id={`status-${status}`}
                    checked={filters.statusFilters.includes(status)}
                    onCheckedChange={(checked) =>
                      handleStatusChange(status, checked as boolean)
                    }
                  />
                  <Label htmlFor={`status-${status}`} className="text-sm">
                    {status}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          {/* Category Filter */}
          <div className="space-y-3">
            <Label>Category</Label>
            <div className="space-y-2">
              {allCategories.map((category) => (
                <div key={category} className="flex items-center space-x-2">
                  <Checkbox
                    id={`category-${category}`}
                    checked={filters.categoryFilters.includes(category)}
                    onCheckedChange={(checked) =>
                      handleCategoryChange(category, checked as boolean)
                    }
                  />
                  <Label htmlFor={`category-${category}`} className="text-sm">
                    {category}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          {/* Pricing Model Filter */}
          <div className="space-y-3">
            <Label>Pricing Model</Label>
            <Select
              value={filters.pricingModelFilter || "all"}
              onValueChange={handlePricingModelChange}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select pricing model" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Models</SelectItem>
                {allPricingModels.map((model) => (
                  <SelectItem key={model} value={model}>
                    {model}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Clear Filters */}
          {hasActiveFilters && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.2 }}
            >
              <Button
                variant="outline"
                size="sm"
                onClick={() => dispatch(clearAllFilters())}
                className="w-full"
              >
                <X className="w-4 h-4 mr-2" />
                Clear All Filters
              </Button>
            </motion.div>
          )}

          {/* Active Filters Display */}
          {hasActiveFilters && (
            <div className="space-y-2">
              <Label className="text-xs text-muted-foreground">
                Active Filters
              </Label>
              <div className="flex flex-wrap gap-1">
                {filters.searchQuery && (
                  <Badge variant="secondary" className="text-xs">
                    Search: {filters.searchQuery}
                  </Badge>
                )}
                {filters.statusFilters.map((status) => (
                  <Badge key={status} variant="secondary" className="text-xs">
                    {status}
                  </Badge>
                ))}
                {filters.categoryFilters.map((category) => (
                  <Badge key={category} variant="secondary" className="text-xs">
                    {category}
                  </Badge>
                ))}
                {filters.pricingModelFilter && (
                  <Badge variant="secondary" className="text-xs">
                    {filters.pricingModelFilter}
                  </Badge>
                )}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}
